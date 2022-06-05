import React, { useEffect } from "react";
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
  Button,
  Container,
  Spacer,
  Flex,
  Select,
  useToast,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { Filters } from "../AdminElecComps/Filters";
import axios from "axios";

function StudentList(props) {
  const toast = useToast();
  const toggleToast = () => {
    return toast({
      title: `Student Deleted Successfully`,
      description: `Please refresh the page to update list `,
      status: "success",
      duration: 6000,
      isClosable: true,
    });
  };

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_ENDPOINT}`,
  });

  //authorization configs to authenticate as admin
  const config = {
    headers: { Authorization: `Bearer ` + localStorage.getItem("token") },
  };

  //function used to delete the student
  const deletStudent = async (rollNumber) => {
    let temp = window.confirm(" Are you sure you want to delete the student?");

    if (temp === true) {
      let res = await api.delete("/api/Student/" + rollNumber, config);
      if (res.status === 200) {
        toggleToast();
      }
      console.log(res);
    }
  };

  const data = React.useMemo(() => props.studentData, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Filter: Filters,
      },
      {
        Header: "Roll",
        accessor: "rollNumber",
        Filter: Filters,
      },
      {
        Header: "Backlogs",
        accessor: "backlogs",
        Filter: Filters,
        disableFilters: true,
      },
      {
        Header: "CGPA",
        accessor: "cgpa",
        Filter: Filters,
        disableFilters: true,
      },
      {
        id: "delete",
        Header: "DELETE",
        Cell: ({ row }) => (
          <Button
            size='sm'
            type='submit'
            leftIcon={<DeleteIcon />}
            color='red.300'
            cursor='pointer'
            colorScheme='white'
            variant='solid'
            onClick={() => {
              deletStudent(row.original.rollNumber);
            }}></Button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable({ columns, data }, useFilters, useSortBy, usePagination);

  const { pageIndex, pageSize } = state;

  return (
    <Center mt='10px'>
      <Box
        borderWidth='2px'
        borderRadius='lg'
        overflow='hidden'
        padding='30px'
        // width='60vw'
        // maxW='60vw'
        boxShadow='sm'
        bg='white'>
        <Table id='table-to-xls' {...getTableProps()}>
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
                      <>{column.canFilter ? column.render("Filter") : null}</>
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
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
        <Container maxW='container.xl' marginTop='10px'>
          <Flex>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>

            <Spacer />

            <span>
              Go to Page:{" "}
              <input
                type='number'
                defaultValue={pageIndex + 1}
                style={{
                  width: "25px",
                  border: "0.5px solid grey",
                  borderRadius: "3px",
                }}
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
              />
            </span>

            <Spacer />

            <Select
              size='xs'
              value={pageSize}
              maxW='6em'
              onChange={(e) => setPageSize(Number(e.target.value))}>
              {[10, 25, 50, 350].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>

            <Spacer />

            <span>
              <Button
                colorScheme='blue'
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                leftIcon={<ChevronLeftIcon />}
                size='sm'>
                Prev
              </Button>
              <Button
                colorScheme='blue'
                onClick={() => nextPage()}
                disabled={!canNextPage}
                rightIcon={<ChevronRightIcon />}
                size='sm'>
                Next
              </Button>
            </span>
          </Flex>
        </Container>
      </Box>
    </Center>
  );
}

export default StudentList;
