import React, { useMemo } from "react";
import { useTable } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./Columns";
import './table.css';

export const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []); // Ensure data is not recreated on every render, else reacct table will think it's receiving new data everytime, performing unnecessary calculation

  const tableInstance = useTable({
    columns,
    data,
  });

  const { 
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    footerGroups,
    rows, 
    prepareRow } =
    tableInstance;// use this with html for table to work right

  return (
    <table {...getTableProps()}>
      <thead>
        {
            headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
            {
                headerGroup.headers.map( (column) => (
                    <th { ...column.getHeaderProps()}>{column.render('Header')}</th>
                ))// Access to headers
            }
        </tr>
        ))
    }
      </thead>
      <tbody {...getTableBodyProps()}>
        {
            rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                           return  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })
                            
                        }
                        
                    </tr>
                )
            })// Access to each row
        }
      </tbody>
      <tfoot>
        {
            footerGroups.map(footerGroup => (
                <tr {...footerGroup.getFooterGroupProps()}>
                    {
                        footerGroup.headers.map(column => (
                            <td {...column.getFooterProps}>
                                {
                                    column.render('Footer')
                                }
                            </td>
                        ))
                    }
                </tr>
            ))
        }
      </tfoot>
    </table>
  );
};
