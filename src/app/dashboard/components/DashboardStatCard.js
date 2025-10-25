import { ResponseHandler } from "../../../components/ResponseHandler"


export const DashboardStatCard = ({ loading, error, data, title, category }) => {

    const renderData = () => {

        return (
            <>
                {
                    category?
                <span className="table-category-icon">
                    <i className={`d-flex align-items-center justify-content-center ${category.icon.class_name} fs-4`}
                        style={{ background: `#${category.color}` }}></i>
                    <h3>{category.name}</h3>
                </span>
                :
                <h3>₹{data}</h3>
                }
            </>
        )
    }
    return (
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
            <div className="stat-widget-1">
                <h6>{title}</h6>
                <ResponseHandler error={error}
                                 loading={loading}
                                 dataToRender={renderData}
                />
            </div>
        </div>
    )



}
