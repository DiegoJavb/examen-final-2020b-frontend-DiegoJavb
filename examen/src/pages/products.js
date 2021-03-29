import React from 'react'
import Table from "../components/Table"
import withAuth from "@/hocs/withAuth";
import {useAuth} from "@/lib/auth";

const Products = () => {
    const {user} = useAuth();

    return (
        <>
            <div>
                <h2>
                    Usuario: {user.user.name}
                </h2>
            </div>
            <Table/>
        </>
    )
}
export default withAuth(Products);