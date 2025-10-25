
import Modal from "react-responsive-modal"
import { Button } from "../../../components/form-elements/Button"
import { CustomInput } from "../../../components/form-elements/Custominput"
import { Controller, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import AsyncCreatableSelect from "react-select/async-creatable"
import authAxios from "../../../config/authAxios"
import { errorHandler } from "../../../utils/helper"
import Select from "react-select"
import toast from "react-hot-toast"

export const AddCategoryModal = ({ open, onClose,icons,fetchCategories }) => {

    const { register, handleSubmit, formState: { errors },setValue,watch,reset,control } = useForm()
    const [status,setStatus] = useState("")

    const name =  watch("name")

    useEffect(()=>{
        let timeout =setTimeout(() => {
            if(name){
                //backend request
                checkIfCategoryExists(name)
            }
        },1000)
        return () => clearTimeout(timeout)
    },[name])

    const checkIfCategoryExists = async (name) => {
        setStatus("loading")
        try{
            const response = await authAxios("/categories/exists",{
                method:"POST",
                data:{
                    name:name,
                }
            })
            if(response.status===200){
                if(response.data.data.exists){
                    setStatus("exists")
                }else{
                    setStatus("available")
                }
            }
        }catch(e){
            errorHandler(e)
        }
    }

    const renderCategoryMessage = (status) => {
        switch(status){
            case "loading":
                return <p className={"text-warning"}>Checking..</p>
            case "exists":
                return <p className={"text-danger"}>Category already exists..</p>
            case "available":
                return <p className={"text-warning"}>Category avsailable..</p>
            default:
                return <></>
        }
    }

    const iconOptions=icons && icons.map((icon) => {
        return{
            label: <i className={`${icon.class_name} text-black`}/>,
            value:icon.id
        }
    })

    const addCategory = async(data) => {
        const postData={
            name:data.name,
            color:data.color.substring(1),
            icon_id:data.icon,
        }
        try{
            const response = await authAxios("/categories",{
                method:"POST",
                data:postData,
            })
            if(response.status === 201){
                toast.success("Category added successfully")
                reset({
                    name:"",
                    icon:"",
                    color:""
                })
                onClose()
                const controller = new AbortController();
                await fetchCategories(controller.signal)
            }
        }catch(e){
            errorHandler(e)
        }
    }

    return (
        <Modal
            open={open}
            onClose={() => {
                onClose()
                reset({
                    name:"",
                    icon:"",
                    color:""
                })
            }}
            center={true}
            classNames={{
                modal: 'card w-25'
            }}
        >
            <div className="card-header">
                <h4 className="card-title">{"Add Category"}</h4>

            </div>
            <div className="card-header">
                <form onSubmit={handleSubmit(addCategory)}>
                    
                    <div className="row">
                        <div className="col-md-12">
                            <CustomInput placeholder={"Enter Name"}
                                name={"name"}
                                type={"text"}
                                register={register}
                                label="Name"
                                validations={{ required: "Name is required" }}
                                errors={errors?.name}
                            />
                        </div>
                         <div className="col-md-12">
                            {renderCategoryMessage(status)}
                            <CustomInput placeholder={"Color"}
                                name={"color"}
                                type={"color"}
                                register={register}
                                label="Color"
                                validations={{ required: "Color is required" }}
                                errors={errors?.color}
                            />
                            <div className={"mb-3"}>
                                <label htmlFor="icon" className={"form-label"}>
                                    Icon
                                </label>
                                <Controller name = {"icon"}
                                            rules={{required:"icon is required"

                                            }}
                                            control={control}
                                            render={({field})=>(
                                                <Select name ={"icon"}
                                                        options={iconOptions}
                                                        onChange={(selectedOption)=>{
                                                            field.onChange(selectedOption.value)
                                                        }}
                                                />
                                            )}
                                />
                                {
                                    errors.icon && <p className={"text-danger"}>{errors?.icon.message}</p>
                                }

                            </div>
                        </div>
                        <Button
                            type={"submit"} label={"Add category"} styleClass={"w-100"}
                        />

                    </div>
                </form>
            </div>

        </Modal>
    )


}