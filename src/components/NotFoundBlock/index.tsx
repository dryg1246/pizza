import React from "react";
import './NotFoundBlock.scss';
import {LeftOutlined} from "@ant-design/icons";

export const NotFoundBlock: React.FC = () => {
    return (
        <div className="not-found">
            <h1 className="not-found__title">Not found</h1>
            <p className="not-found__subtitle"> <LeftOutlined /> Let's go back</p>
        </div>
    );
};