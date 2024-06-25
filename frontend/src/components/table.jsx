import { useSelector } from "react-redux";
import { useGetByRangeQuery } from "../services/ticker";
import { useEffect } from "react";

const Table = ({ stock }) => {
  const price = useSelector((state) => state.ticker.price);
  const volume = useSelector((state) => state.ticker.volume);
  const USNumber = new Intl.NumberFormat("en-US");
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    console.log(stock);
  }, [stock]);

  const { error, isLoading } = useGetByRangeQuery(
    {
      stock: stock,
      start: "2023-01-01",
      end: "2023-12-31",
    },
    { skip: !stock }
  );

  return (
    <div className="display">
      {error && <div className="error-msg">Error Loading Data</div>}
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Maximum</th>
              <th>Minimum</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Price</td>
              <td>{USDollar.format(price.maximum)}</td>
              <td>{USDollar.format(price.minimum)}</td>
              <td>{USDollar.format(price.average)}</td>
            </tr>
            <tr>
              <td>Volume</td>
              <td>{USNumber.format(volume.maximum)}</td>
              <td>{USNumber.format(volume.minimum)}</td>
              <td>{USNumber.format(volume.average)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
