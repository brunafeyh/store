import { FC } from "react";
import PageClientLayout from "../../../layout/client";
import { Banner } from "../../../components/banner";

export const HomePage: FC = () =>{
    return (
        <PageClientLayout title="Home">
            <Banner/>
        </PageClientLayout>
    )
}