import {Card, Layout, PageHeader, Select, Typography} from "antd";
import {React, useEffect, useState} from "react";
import DataCard from "../../compoments/DataCard";
import {Collapse} from 'antd';
import axios from "axios";
import {getServerAddr} from "../../config/constant";
import {DataGroupCard} from "../../compoments/DataGroupCard";

const {Panel} = Collapse;
const {Option} = Select;
const {Title} = Typography;

const DataPresentation = () => {
    useEffect(() => {
        (async () => {
            await axios
                .get("/api/experiment/group/list")
                .then(
                    (response) => {
                        console.log(response.data.data);
                        setGroupList(response.data.data);
                    }
                )
        })()
    }, [])


    const [groupList, setGroupList] = useState([]);
    const [curExprGroupId, setCurExprGroupId] = useState(0);
    const [curExpr, setCurExpr] = useState(null);

    const selectOptionList = groupList.map((expr, idx) => {
        return <Option value={idx} key={expr.id}>{"实验" + expr.experimentGroupId + ": " + expr.exprAbstract}</Option>
    })

    let dataGroupCardList = [];
    if (curExpr != null) {
        let rdm = Math.random() + ""
        dataGroupCardList = curExpr.beepMultiExprList.map((expr, idx) => {
            const exprInfo = {
                "chirpParameters": expr.chirpParameters,
                "deviceList": curExpr.deviceList,
                "exprIdList": expr.exprIdList,
                "realDistance": curExpr.realDistance,
                "imageList": curExpr.imageList,
                "imageDescriptionList": curExpr.imageDescriptionList
            }
            // console.log(exprInfo);
            return <DataGroupCard key={idx + rdm} exprInfo={exprInfo}/>

        })

    }


    return (
        <Layout.Content className="site-content">
            <PageHeader
                className="site-page-header"
                title="实验结果浏览"
                subTitle="在这里观察多次实验的结果"
            />

            <Card title={"实验选择"} style={{marginTop: 24}}>
                <Select
                    showSearch
                    style={{width: '100%'}}
                    placeholder={"选择实验"}
                    onChange={
                        (value) => {
                            console.log(value);
                            setCurExpr(groupList[value]);
                            setCurExprGroupId(groupList[value].experimentGroupId);
                            console.log(groupList[value]);
                        }
                    }
                >
                    {selectOptionList}
                </Select>

            </Card>

            {dataGroupCardList}


            {/*<DataGroupCard exprInfo={exprInfo}/>*/}


        </Layout.Content>
    );
}

export default DataPresentation;