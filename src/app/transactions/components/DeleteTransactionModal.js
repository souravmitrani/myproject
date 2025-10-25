
import Modal from "react-responsive-modal"
import { Button } from "../../../components/form-elements/Button"

export const DeleteTransactionModal = ({ open, onClose, onDelete }) => {

    return (
        <Modal
            open={open}
            onClose={onClose}
            center={true}
            classNames={{
                modal: 'card w-25'
            }}
        >
            <div className="card-header">
                <h3 className="card-title">Delete Transaction</h3>

            </div>
            <div className="card-body">
                <p>Do you really want to delete this transaction</p>

                <div className="d-flex justify-content-end gap-2">

                    <Button
                        type="button" label="Cancel" variant="secondary" onClick={onClose}
                    />
                    <Button
                        type="button" label="Delete" variant="danger" onClick={onDelete}
                    />



                </div>

            </div>

        </Modal>
    )


}