import 'react-responsive-modal/styles.css';
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { EXPENSE } from "../../../constants/constants"
import authAxios from "../../../config/authAxios"
import toast from "react-hot-toast"
import { errorHandler } from "../../../utils/helper"
import Modal from "react-responsive-modal"
import { Select } from "../../../components/form-elements/Select"
import { CustomInput } from '../../../components/form-elements/Custominput';
import { Button } from '../../../components/form-elements/Button';

const typeOptions = [
    { value: "income", name: "income" },
    { value: "expense", name: "expense" },

]

export const AddTransactionModal = ({ categories, open, onClose, singleTransaction, fetchTransactions }) => {

    const { register, setValue, watch, reset, handleSubmit, formState: { errors } } = useForm()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (singleTransaction) {
            setValue("note", singleTransaction.notes)
            setValue("amount", singleTransaction.amount)
            setValue("type", singleTransaction.type)
            setValue("date", singleTransaction.date)
            setValue("category", singleTransaction.category_id)
        }
    }, [singleTransaction])

    const categoryOptions = categories && categories.map(category => {
        return {
            name: category.name,
            value: category.id,
        }
    })

    const addTrasaction = async (data) => {
        setLoading(true)
        const postData = {
            notes: data.note,
            amount: data.amount,
            date: data.date,
            type: data.type,
        }

        if (data.type === EXPENSE) {
            postData.category_id = data.category
        }
        try {
            if (singleTransaction) {
                //edit
                const response = await authAxios(`/transactions/${singleTransaction.id}`, {
                    method: "PUT",
                    data: postData
                })
                if (response.status === 200) {
                    toast.success("Trasaction edited successfully")
                }
            } else {
                const response = await authAxios("/transactions", {
                    method: "POST",
                    data: postData
                })
                if (response.status === 201) {
                    toast.success("Toast added sucessfully")
                }
            }

            reset({
                note: "",
                amount: "",
                date: "",
                type: "",
                category: ""
            })
            onClose()
            const controller = new AbortController();
            await fetchTransactions(controller.signal)

        } catch (e) {
            errorHandler(e)
        } finally {
            setLoading(false)
        }
    }

    const type = watch('type')
    console.log(type)

    return (
        <Modal onClose={() => {
            onClose()
            reset({
                note: "",
                amount: "",
                date: "",
                type: "",
                category: ""
            })
        }}
            open={open}
            center={true}
            classNames={{
                modal: 'card w-25'
            }}
        >
            <div className="card-header">
                <h3 className="card-title">{singleTransaction ? "Edit Transaction" : "Add Transaction"}</h3>

            </div>
            <div className="card-header">
                <form onSubmit={handleSubmit(addTrasaction)}>
                    <div className="row">
                        <div className="col-md-12">
                            <CustomInput placeholder={"Enter note"}
                                name={"note"}
                                type={"text"}
                                register={register}
                                label="Note"
                                validations={{ required: "Note is required" }}
                                errors={errors?.note}
                            />
                        </div>
                        <div className="col-md-12">
                            <CustomInput placeholder={"Enter Amount"}
                                name={"amount"}
                                type={"number"}
                                register={register}
                                label="Amount"
                                validations={{ required: "Amount is required" }}
                                errors={errors?.amount}
                            />
                        </div>
                        <div className="col-md-12">
                            <Select
                                placeholder={"Select type"}
                                name={"type"}
                                options={typeOptions}
                                register={register}
                                label={"Type"}
                                validations={{ required: "Type is required" }}
                                errors={errors.type}
                            />


                        </div>
                        <div className="col-md-12">
                            <CustomInput placeholder={"Enter Date"}
                                name={"date"}
                                type={"date"}
                                register={register}
                                label="Date"
                                validations={{ required: "date is required" }}
                                errors={errors?.date}
                            />
                        </div>

                        {type === EXPENSE && <Select register={register}
                            name={"category"}
                            placeholder={"Select Category"}
                            options={categoryOptions}
                            label="Category"
                            validations={{ required: "category is required" }}
                            errors={errors?.category}

                        />}
                        <Button
                            type={"submit"} label={singleTransaction ? "Update Transaction" : "Add Transaction"} loading={loading} styleClass={"w-100"}
                        />

                    </div>
                </form>
            </div>

        </Modal>
    )
}