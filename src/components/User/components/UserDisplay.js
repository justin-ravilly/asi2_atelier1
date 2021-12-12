import React from 'react';
import { Card, Container } from 'semantic-ui-react'

 export const UserDisplay=(props) =>{
    return (
            <Container>
            <span className='date'> {props.connected}</span>
            </Container>
        );
    }

