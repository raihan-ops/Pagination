import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';


import TableRow from '@mui/material/TableRow';
import { Button, CircularProgress, Container, Pagination } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/system';

interface Column {
    id: 'title' | 'url' | 'created_at' | 'author';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'title', label: 'title', minWidth: 100 },
    { id: 'url', label: 'url', minWidth: 170 },
    {
        id: 'created_at',
        label: 'created_at',
        minWidth: 100,
        align: 'right',

    },
    {
        id: 'author',
        label: 'author',
        minWidth: 100,
        align: 'right',

    },

];



export interface InitPost {
    title: string,
    url: string,
    created_at: Date,
    author: string
}


const MYPagination: React.FC = () => {
    const [page, setPage] = React.useState<number>(0);
    const rowsPerPage: number = 20;
    const [totalElement, setTotalElement] = useState<number>(0);
    const [load, setLoad] = useState<boolean>(false);
    const [post, setPost] = useState<InitPost[]>([]);
    const [counter, setCounter] = useState<any>(null);
    const history = useHistory();

    // local page
    const [localPage, setLocalPage] = useState<number>(1)

    useEffect(() => {

        const interval = setInterval(() => {

            setPage(_page => _page + 1)
        }, 10000)
        setCounter(interval);
        return () => clearInterval(counter)
    }, [])

    useEffect(() => {
        getPost()
    }, [page])

    const getPost = () => {
        setLoad(true)
        fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
            .then(res => res.json())
            .then(data => {
                const _post = [...post, ...data.hits]
                setPost(_post)
                setTotalElement(_post.length)
                setLoad(false)
            })
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setLocalPage(newPage);
    };

    const getDetails = (post: InitPost) => {
        history.push("/about", { state: post })
    }

    return (
        <div data-testid="page">
            <>
                {
                    load ? <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                        <CircularProgress /> Trying to laod New Post</Box> : <></>
                }
                <Container sx={{ maxWidth: "100%" }}>
                    <Paper >
                        <TableContainer sx={{ height: "90%" }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {
                                            columns.map(column =>
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            )
                                        }
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {
                                        post
                                            .slice((localPage - 1) * rowsPerPage, (localPage - 1) * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                return (
                                                    <TableRow
                                                        key={index}
                                                        onClick={() => getDetails(row)}
                                                        sx={{ cursor: 'pointer' }}
                                                    >
                                                        {
                                                            columns.map(column => {
                                                                const value = row[column.id];
                                                                return (
                                                                    <TableCell
                                                                        key={column.id}
                                                                    >
                                                                        {value}
                                                                    </TableCell>
                                                                )
                                                            })
                                                        }
                                                    </TableRow>
                                                )
                                            })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
                    <Pagination
                    
                    sx={{margin:"10px"}}
                    variant="outlined" color="secondary"
                    count={totalElement / rowsPerPage}

                    page={localPage}
                    onChange={handleChangePage}

                />

                </Container>
                
            </>
        </div>

    );
};

export default MYPagination;