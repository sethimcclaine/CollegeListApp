import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, Card, CardBody, CardFooter,
    CardHeader,
    Form,
} from 'reactstrap';

export const CardForm = ({ title, onSubmit, children }) => (
    <div className="animated fadeIn">
        <Card>
            <CardHeader> <strong>{ title }</strong>
            </CardHeader>
            <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    { children }
                </Form>
            </CardBody>
            <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={ onSubmit }>
                    <i className="fa fa-dot-circle-o"></i>
                    Submit
                </Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i>Reset --@TODO</Button>
            </CardFooter>
        </Card>
    </div>
);

CardForm.propTypes = {
    title: PropTypes.string,
    onSubmit: PropTypes.func,
    children: PropTypes.array,
};
