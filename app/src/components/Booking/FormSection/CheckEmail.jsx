import React, { Fragment } from 'react'
import $ from 'jquery'
import PropTypes from 'prop-types'
import Transaction, {transactionType} from '../../Transaction'

class CheckEmail extends React.Component {
  componentDidMount () {
    $('#checkEmail').modal('show')
    $('#checkEmail').on('hidden.bs.modal', () => {
      this.props.onClose()
    })
  }

  render () {
    const {txs} = this.props.instructions
    return (
      <div className="modal" id="checkEmail" tabIndex="-2" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Please, check your email</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <i className="mdi mdi-close"/>
              </button>
            </div>
            <div className="modal-body">
              <h5 className="mb-1">We sent the payment instructions to your email address.</h5>
              <h5 className="mb-1">To pay your room and book it</h5>
              {txs.length > 1 ? <LifBody txs={txs}/> : <EthBody tx={txs[0]}/>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal">Ok</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const EthBody = ({tx}) => (
  <Fragment>
    <h5 className="mb-1">Please, send following transaction.</h5>
    <Transaction {...tx}/>
  </Fragment>
)

const LifBody = ({txs}) => (
  <Fragment>
    <h5 className="mb-1">Please send the following transactions in order.</h5>
    {txs.map((tx, index) => <Transaction key={index} {...tx}/>)}
  </Fragment>
)

const instructionsType = PropTypes.shape({
  txs: PropTypes.arrayOf(PropTypes.shape(transactionType)),
  booking: PropTypes.object
})

CheckEmail.propTypes = {
  onClose: PropTypes.func.isRequired,
  instructions: instructionsType
}

export default CheckEmail
