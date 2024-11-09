import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip
} from '@mui/material';

export default function TablePayment({ payments }) {
    return (
        <TableContainer
            component={Paper}
            elevation={3}
            sx={{
                mt: 3,
                overflowX: 'auto',
                width: '100%',
                maxWidth: { xs: '100%', sm: '600px', md: '800px', lg: '100%' },
                mx: 'auto'
            }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="payment table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Payment ID</strong></TableCell>
                        <TableCell><strong>Package Name</strong></TableCell>
                        <TableCell><strong>Date</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {payments.map((payment) => (
                        <TableRow key={payment.id}>
                            <TableCell>{payment.id}</TableCell>
                            <TableCell>{payment.packageName}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>
                                <Chip
                                    label={payment.status}
                                    color={payment.status === 'Completed' ? 'success' : 'warning'}
                                    variant="outlined"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
