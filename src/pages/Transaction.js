import React from 'react';
import { useParams } from 'react-router-dom';

export default function Block() {
    const { txnHash } = useParams();
    return <div>{txnHash}</div>;
}
