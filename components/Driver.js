import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { database } from "../config/apikeys";

const dbInstance = collection(database, "drivers");

function Driver() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getResult = () => {
    setLoading(true);
    getDocs(dbInstance)
      .then((data) => {
        setLoading(false);
        setDrivers(
          data.docs.map((item) => {
            console.log(item.data());
            return {
              ...item.data(),
              id: item.id,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err, "error ");
        setLoading(false);
      });
  };

  useEffect(() => {
    getResult();
  }, []);

  const tableData = React.useMemo(() => {
    return drivers;
  }, [drivers]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Contact",
        accessor: "contact",
      },
      {
        Header: "Vehicle number",
        accessor: "vehicleNumber",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "From",
        accessor: "from",
      },
      {
        Header: "To",
        accessor: "to",
      },
      {
        Header: "Going Date",
        accessor: "date",
        Cell: ({ row: { original } }) => {
          return original.date
            ? new Date(original.date).toLocaleDateString()
            : new Date().toLocaleDateString();
        },
      },
      {
        Header: "Form submitted date",
        accessor: "createdAt",
        Cell: ({ row: { original } }) => {
          return original.createdAt
            ? new Date(original.createdAt).toLocaleDateString()
            : new Date().toLocaleDateString();
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });
  console.log(tableData);
  return (
    <div>
      {loading ? (
        <div>
          <h2>Loading</h2>
        </div>
      ) : drivers.length === 0 ? (
        <div>
          <h2>No data</h2>
        </div>
      ) : (
        <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps()}
                    key={index}
                    style={{
                      borderBottom: "solid 3px red",
                      background: "aliceblue",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={index}
                        style={{
                          padding: "10px",
                          border: "solid 1px gray",
                          background: "papayawhip",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Driver;
