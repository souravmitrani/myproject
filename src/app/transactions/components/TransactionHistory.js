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
        //fetch transaction'
        await fetchSingleTransaction(id);
        setIsTransactionModalOpen(true);
    }

    const onEditClose = () => {
        //fetch transaction'
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
                await fetchTransactions(controller.signal)
            }
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
                <div className="card-header">
                    <h4 className="card-title">Transaction History</h4>
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