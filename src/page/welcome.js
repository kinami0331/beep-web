// page/welcome.js
import React from "react";
import {Layout, PageHeader, Typography} from "antd";

const Welcome = () => {
    const {Title} = Typography;
    return (
        <Layout.Content className="site-content">
            <PageHeader
                className="site-page-header"
                title="欢迎"
                subTitle="这是一个简单的beepbeep控制台"
            />
            {/*<Layout.Content className="site-content">*/}
            {/*    <Typography>*/}
            {/*        <Title>第一部分</Title>*/}
            {/*        asdfasdasdf*/}
            {/*    </Typography>*/}
            {/*</Layout.Content>*/}

        </Layout.Content>
    );
}

export default Welcome;
