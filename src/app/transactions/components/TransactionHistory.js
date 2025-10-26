import { useState } from "react";
import { ResponseHandler } from "../../../components/ResponseHandler";
import { EXPENSE } from "../../../constants/constants";
import { useFetch } from "../../../hooks/useFetch"
import { DeleteTransactionModal } from "./DeleteTransactionModal";
import authAxios from "../../../config/authAxios";
import toast from "react-hot-toast";
import { errorHandler } from "../../../utils/helper";
import { AddTransactionModal } from "./AddTransactionModal";
 


export const TransactionHistory = ({isTransactionModalOpen,setIsTransactionModalOpen,categories}) => {

    const { data: transactions, loading, error,fetchData:fetchTransactions } = useFetch("/transactions");
    const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);
    const [deleteId,setDeleteId] = useState(null);
    const [singleTransaction,setSingleTransaction] = useState(null);
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [currentFilters,setCurrentFilters] = useState(null);

    //EDIT

    const fetchSingleTransaction = async(id) => {
        try{
            const response = await authAxios(`/transactions/${id}`);
            if(response.status === 200){
                setSingleTransaction(response.data.data);
            }
        }catch(e){
            errorHandler(e)
        }
    }

    const onEditOpen = async(id) => {
        await fetchSingleTransaction(id);
        setIsTransactionModalOpen(true);
    }

    const onEditClose = () => {
        setSingleTransaction(null);
        setIsTransactionModalOpen(false);
    }

    const onDeleteOpen=(id) =>{
        setIsDeleteModalOpen(true);
        setDeleteId(id);
    }

    const onDeleteClose = () => {
        setIsDeleteModalOpen(false);
        setDeleteId(null);
    }

    const onDelete =async() => {
        try{
            const response = await authAxios(`/transactions/${deleteId}`, {method:"DELETE"});
            if(response.status===200){
                toast.success("Transaction deleted successfully")
                onDeleteClose()
                const controller = new AbortController();
                await fetchTransactions(controller.signal, currentFilters || undefined)
            }
        }catch(e){
            errorHandler(e)
        }
    }

    const handleFilter = async() =>{
        const controller = new AbortController();
        const params = {};
        if(startDate) params.start_date = startDate;
        if(endDate) params.end_date = endDate;
        setCurrentFilters(Object.keys(params).length ? params : null);
        await fetchTransactions(controller.signal, params)
    }

    const clearFilter = async() =>{
        setStartDate("");
        setEndDate("");
        setCurrentFilters(null);
        const controller = new AbortController();
        await fetchTransactions(controller.signal, undefined)
    }

    const exportCSV = async() =>{
        try{
            const params = {};
            if(startDate) params.start_date = startDate;
            if(endDate) params.end_date = endDate;
            const response = await authAxios({ url: '/transactions', params });
            const txns = response?.data?.data || [];

            // Build CSV
            const header = ['Date','Category','Title/Notes','Type','Amount'];
            const rows = txns.map(t => {
                const date = t.date || t.created_at || t.transaction_date || '';
                const category = t.category?.name || (t.type === EXPENSE ? 'Expense' : 'Income');
                const notes = t.notes || '';
                const type = t.type || '';
                const amount = t.amount || '';
                return [date, category, notes, type, amount];
            })

            const csvContent = [header, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const filename = `transactions_${startDate || 'all'}_${endDate || 'all'}.csv`;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }catch(e){
            errorHandler(e)
        }
    }

    const renderTransactions = () => {
        return (
            <table className="table mb-0 table-responsive-sm">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions?.length > 0 && transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>
                                    {
                                        transaction.type === EXPENSE ?
                                            <span className="table-category-icon">
                                                <i className={`d-flex align-items-center justify-content-center ${transaction.category.icon.class_name} fs-4`} style={{ background: `#${transaction.category.color}` }}></i>
                                                {transaction.category.name}
                                            </span>
                                            :
                                            <span className="table-category-icon">
                                                <i className="d-flex align-items-center justify-content-center bg-success fs-3 ri-money-dollar-circle-line"></i>
                                                Income
                                            </span>
                                    }
                                </td>
                                <td>
                                    {transaction.notes}
                                </td>
                                <td>
                                    {transaction.type.toUpperCase()}
                                </td>
                                <td>{transaction?.amount}</td>
                                <td className="text-center">
                                    <div className="d-flex justify-content-center gap-2">
                                        <button className="btn btn-sm p-1" onClick={() => onEditOpen(transaction?.id)} title="Edit Transaction">
                                            <i className="ri-edit-2-line text-warning"></i>
                                        </button>
                                        <button className="btn btn-sm p-1" onClick={() => onDeleteOpen(transaction?.id)} title="Delete Transaction">
                                            <i className="ri-delete-bin-line text-danger"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
    return (
        <div>
            <div className="card">
                <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
                    <div>
                        <h4 className="card-title">Transaction History</h4>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <div className="d-flex gap-2 align-items-center">
                            <label className="m-0">From</label>
                            <input type="date" className="form-control form-control-sm" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                            <label className="m-0">To</label>
                            <input type="date" className="form-control form-control-sm" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                        <button className="btn btn-sm btn-primary" onClick={handleFilter}>Filter</button>
                        <button className="btn btn-sm btn-secondary" onClick={clearFilter}>Clear</button>
                        <button className="btn btn-sm btn-outline-success" onClick={exportCSV}>Export CSV</button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="transaction-table">
                        <div className="table-responsive">
                            <ResponseHandler loading={loading} error={error} dataToRender={renderTransactions} />
                        </div>
                    </div>
                </div>
            </div>
            <DeleteTransactionModal open={isDeleteModalOpen} onClose={onDeleteClose} onDelete={onDelete}/>
             <AddTransactionModal categories={categories} 
                                  open={isTransactionModalOpen} 
                                  onClose={onEditClose}
                                  singleTransaction={singleTransaction} 
                                  fetchTransactions={fetchTransactions}
            />
        </div>
       
    )
}