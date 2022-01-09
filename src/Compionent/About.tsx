import React from 'react';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { InitPost } from './MYPagination';




const About :React.FC =() => {
const {state}=useLocation();

const post=state as InitPost ;
    
    return (
        <div data-testid="about">
            <pre>
                {
                    JSON.stringify(post,null,2)
                }
            </pre>
        </div>
    );
};

export default About;