import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tickerApi } from "../services/ticker";
import tickerSlice, { setPriceValues, setVolumeValues } from "./slice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: tickerApi.endpoints.getByRange.matchFulfilled,
  effect: (action, listenerApi) => {
    const data = action.payload.results;

    if (!data) {
      return;
    }

    let prMax, prMin, prAvg, vlMax, vlMin, vlAvg;
    prMax = prAvg = vlMax = vlAvg = 0;
    prMin = vlMin = Number.MAX_SAFE_INTEGER;

    data.forEach((item) => {
      prMax = Math.max(prMax, item.h);
      prMin = Math.min(prMin, item.l);
      prAvg += item.c;

      vlMax = Math.max(vlMax, item.v);
      vlMin = Math.min(vlMin, item.v);
      vlAvg += item.v;
    });

    prAvg = prAvg / data.length;
    vlAvg = vlAvg / data.length;

    listenerApi.dispatch(
      setPriceValues({
        maximum: prMax,
        minimum: prMin,
        average: prAvg,
      })
    );

    listenerApi.dispatch(
      setVolumeValues({
        maximum: vlMax,
        minimum: vlMin,
        average: vlAvg,
      })
    );
  },
});

const store = configureStore({
  reducer: {
    ticker: tickerSlice,
    [tickerApi.reducerPath]: tickerApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      listenerMiddleware.middleware,
      tickerApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
