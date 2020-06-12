import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

function RenderDish( {dish} ) {
    return(
        <div className='col-12 col-md-5 m-1'>
            <Card dish={dish}>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments( {comments} ) {
    if (comments != null) {
        const renderedComments = comments.map((comment) => {
            return (
                <ul key={comment.id} className='list-unstyled'>
                    <li>{comment.comment}</li>
                    <li>-- {comment.author} <span>{new Intl.DateTimeFormat('en-us', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</span></li>
                </ul>
            );
        });

        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {renderedComments}
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

const DishDetail = (props) => {

    //add in map here and remove it from RenderComments
    if (props.dish != null) {
        return(
            <div className='container'>
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.dish.comments}/>
                </div>
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
}

export default DishDetail;
