import React from 'react';
import { Modal, Button, Col, Row, Container } from 'react-bootstrap';
import '../card-modal/card-modal.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

class CardModal extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            show: false,
            setShow: false,
            invalid:{
                width: false,
                drop: false
            },
            width: null,
            drop: null,
            totalPrice: null
        }
    }

    /* show/hide modal, also reset input when it closes */
    handleModal(){
        const initialState = { 
            show: false,
            setShow: false,
            invalid:{
                width: false,
                drop: false
            },
            width: null,
            drop: null,
            totalPrice: null
        }
        this.setState({
            ...initialState,
            show:!this.state.show})
    }

    /* calculate total price only if both inputs are within limits */
    calculatePrice() {
        if(!this.state.invalid.width && !this.state.invalid.drop){
            this.setState({totalPrice: (this.state.drop*this.state.width*this.props.price_per_metre_squared/10000).toFixed(2)})
        }
    }
    

    /* calculate total price only if both inputs are within limits */
    handleInput = e => {
        const {value, name} = e.target;
        /* if input is outside limits show warning */   
        if (value < this.props.limits[name].min || value > this.props.limits[name].max) {
            this.setState({
                invalid:{
                    ...this.state.invalid,
                     [name]:true},
                     [name]:value
                    })
        }else {
        /* if input is correct calculate price */ 
            this.setState({
                invalid:{
                    ...this.state.invalid,
                     [name]:false},
                     [name]:value
                    }, () => {this.calculatePrice()})
            }
        }

    render(){
        return (
        <>
            <Button className="btn-get-price" onClick={() => {this.handleModal()}} > Get Price</Button>
            {/* modal code template originally taken from react-bootstrap*/}
                <Modal className="modal-container" dialogClassName="modal-60w" show={this.state.show} onHide={() => {this.handleModal()}}>
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body className="modal-body" >
                                <Container>
                                    <Row>
                                        <Col className="modal-img-col" lg={6}>
                                            <img alt="blind" src={this.props.images.main} />
                                        </Col>
                                        <Col className="modal-text-col" lg={6}>
                                            <h2>{this.props.name}</h2>
                                            <p>{this.props.description}</p>
                                            <p className="font-weight-bold">Enter measurements to get a price</p>
                                            <Row>
                                            <Col className="input-col" sm={12} lg={6}>
                                                <div className="input-wrap">
                                                    <input name="width" className="modal-input" type="number" placeholder="Width(cm)" onKeyUp={this.handleInput}/>
                                                    {/* only show if input is within limits*/}
                                                    { (!this.state.invalid.width && this.state.width) &&
                                                    <FontAwesomeIcon icon={faCheck} />
                                                        }
                                                </div>
                                                    {/* only show if input is outside limits*/}
                                                { (this.state.invalid.width && this.state.width) &&
                                                        <p className="warning">
                                                            Limits: {this.props.limits.width.min}cm - {this.props.limits.width.max}cm
                                                        </p>
                                                    }
                                            </Col>
                                            <Col className="input-col" sm={12} lg={6}>
                                                <div className="input-wrap">
                                                    <input name="drop" className="modal-input" type="number" placeholder="Drop(cm)" onKeyUp={this.handleInput}/>
                                                    {/* only show if input is within limits*/}
                                                    { (!this.state.invalid.drop && this.state.drop) &&
                                                    <FontAwesomeIcon icon={faCheck} />
                                                        }
                                                </div>
                                                    {/* only show if input is outside limits*/}    
                                                    { (this.state.invalid.drop && (this.state.drop>0)) &&
                                                            <p className="warning">
                                                                Limits: {this.props.limits.drop.min}cm - {this.props.limits.drop.max}cm
                                                            </p>
                                                        }
                                                
                                            </Col>       
                                            </Row>
                                            <Row>
                                                <Col className="text-center">
                                                {/* only show total price & button if both inputs are correct*/} 
                                            { 
                                                (!this.state.invalid.width && !this.state.invalid.drop && this.state.width && this.state.drop) &&
                                                <div> 
                                                    <p className="total-price font-weight-bold"> £{this.state.totalPrice}</p>
                                            
                                                    <Button className="btn-total-price" >Add to Basket</Button>
                                                </div>   
                                            }
                                                </Col>   
                                            </Row>
                                        </Col>  
                                        </Row>
                                    </Container>    
                            </Modal.Body>                       
                        </Modal>
                
        </>
        );
  }
}
export default CardModal;