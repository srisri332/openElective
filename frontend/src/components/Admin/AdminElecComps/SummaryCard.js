import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Center,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";

function SummaryCard() {
  const data = React.useMemo(
    () => [
      {
        name: "inches",
        roll: "millimetres (mm)",
        sec: 25.4,
        cgpa: "8.5",
        elec: "No",
      },
      {
        name: "inches",
        roll: "millimetres (mm)",
        sec: 25.4,
        cgpa: "8.5",
        elec: "No",
      },
      {
        name: "inches",
        roll: "millimetres (mm)",
        sec: 25.4,
        cgpa: "8.5",
        elec: "No",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Roll",
        accessor: "roll",
      },
      {
        Header: "Section",
        accessor: "sec",
      },
      {
        Header: "CGPA",
        accessor: "cgpa",
      },
      {
        Header: "Elected",
        accessor: "elec",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Center mt='10px'>
      <Box
        borderWidth='2px'
        borderRadius='lg'
        overflow='hidden'
        padding='30px'
        width='60vw'
        maxW='60vw'
        boxShadow='sm'
        bg='white'>
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}>
                    {column.render("Header")}
                    <chakra.span pl='4'>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label='sorted descending' />
                        ) : (
                          <TriangleUpIcon aria-label='sorted ascending' />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}>
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Center>
  );
}

export default SummaryCard;
