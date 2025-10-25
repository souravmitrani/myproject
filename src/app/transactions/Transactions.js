import { useState } from "react";
import { useFetch } from "../../hooks/useFetch"
import { Button } from "../../components/form-elements/Button";
import { AddTransactionModal } from "./components/AddTransactionModal";
import { TransactionHistory } from "./components/TransactionHistory";
import { AddCategoryModal } from "./components/AddCategoryModal";
import { OverallExpenseChart } from "./components/OverallExpenseChart";

export const Transactions = () => {
    const {data:icons} =useFetch("/icons")
    const {data,fetchData:fetchCategories} =useFetch("/categories");
    const [isTransactionModalOpen,setIsTransactionModalOpen] = useState(false)
    const [isCategoryModalOpen,setIsCategoryModalOpen] = useState(false)

    const {data:OverallCategoryWiseData,loading:OverallCategoryWiseLoading,error:OverallCategoryWiseDataError} = useFetch("/get-overall-category-wise-breakdown")
    

    return(
        <div className="content-body">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-start">
                        <div className="page-title">
                            <h3>Trasactions</h3>
                        </div>
                        <div className="d-flex mx-2">
                            <Button onClick={() => setIsTransactionModalOpen(true)} type={"button"} label={"Add Transaction"} styleclass={"mx-2"}
                            />
                            <Button onClick={() => setIsCategoryModalOpen(true)} type={"button"} label={"Add Category"}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Side by side layout */}
            <div className="row">
                <div className="col-md-5 col-lg-4">
                    <OverallExpenseChart data={OverallCategoryWiseData} loading={OverallCategoryWiseLoading} error={OverallCategoryWiseDataError}/>
                </div>
                <div className="col-md-7 col-lg-8">
                    <TransactionHistory categories={data} isTransactionModalOpen={isTransactionModalOpen} setIsTransactionModalOpen={setIsTransactionModalOpen}/>
                </div>
            </div>
            
            <AddCategoryModal open={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} icons={icons} fetchCategories={fetchCategories}/>
        </div>
    )
}