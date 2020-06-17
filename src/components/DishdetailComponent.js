import React, { Component } from 'react';
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Breadcrumb,
    BreadcrumbItem,
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    Label,
    Col,
    Row
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
    }

    toggleModal = () => {
        const { isModalOpen } = this.state;

        this.setState({ isModalOpen: !isModalOpen });
    };

    handleSubmit = (values) => {
        this.toggleModal();
        alert(`Current State is: + ${JSON.stringify(values)}`);
    };

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
            </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="Rating" md={12}>
                                    Rating
                    </Label>
                                <Col md={12}>
                                    <Control.select
                                        model=".rating"
                                        name="rating"
                                        className="form-control"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={12} htmlFor="author">
                                    Your Name
                </Label>
                                <Col md={12}>
                                    <Control.text
                                        model=".auhtor"
                                        name="author"
                                        className="form-control"
                                        id="author"
                                        placeholder="Your Name"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>
                                    Comment
                </Label>
                                <Col md={12}>
                                    <Control.textarea
                                        model=".comment"
                                        id="comment"
                                        className="form-control"
                                        rows="6"
                                        name="comment"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10 }}>
                                    <Button type="submit" color="primary">
                                        Submit
                  </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const DishDetail = (props) => {
    const { dish, comments } = props;

    if (!dish) {
        return <div></div>;
    }

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/menu">Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <RenderDish dish={dish} />

                <div className="col-12 col-md-5">
                    <RenderComments comments={comments} />
                </div>
            </div>
        </div>
    );
};

const RenderDish = ({ dish }) => (
    <Card className="col-12 col-md-5 m-1">
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
        </CardBody>
    </Card>
);

function RenderComments({ comments }) {
    const renderedComments = comments.map((item) => (
        <li key={item.id}>
            <p>{item.comment}</p>
            <p>
                -- {item.author}{' '}
                {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(Date.parse(item.date)))}
            </p>
        </li>
    ));

    return (
        <div className="container">
            <h4>Comments</h4>

            <ul className="list-unstyled">{renderedComments}</ul>
            <CommentForm />
        </div>
    );
}

export default DishDetail;
