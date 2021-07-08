import DataCard from "./DataCard";
import {Collapse, Select} from "antd";
import {React, useState} from "react";
import {getServerAddr} from "../config/constant";

const {Panel} = Collapse;


const DataGroupCard = (props) => {
    const onWheelHandler = (e) => {
        e.currentTarget.scrollLeft += e.deltaY;
    }

    const onMouseEnterHandler = (e) => {
        document.body.style.overflow = "hidden";

    }

    const onMouseLeaveHandler = (e) => {
        document.body.style.overflow = "auto";
    }

    const exprInfo = props.exprInfo;
    const header = "频率范围: " + exprInfo.chirpParameters.lowerLimit + "Hz~" + exprInfo.chirpParameters.upperLimit + "Hz" +
        "\xa0\xa0\xa0时长: " + exprInfo.chirpParameters.chirpTime + "ms" +
        "\xa0\xa0\xa0麦克风预热时间: " + exprInfo.chirpParameters.prepareTime + "ms" +
        "\xa0\xa0\xa0采样率: " + exprInfo.chirpParameters.samplingRate + "Hz" +
        "\xa0\xa0\xa0实际距离: " + exprInfo.realDistance + "m";

    const options = [
        {
            label: exprInfo.deviceList[0] + " to " + exprInfo.deviceList[1] + " 原始信号",
            value: exprInfo.deviceList[0] + "_to_" + exprInfo.deviceList[1] + "_fig1.png"
        },
        {
            label: exprInfo.deviceList[0] + " to " + exprInfo.deviceList[1] + " 第一段声音",
            value: exprInfo.deviceList[0] + "_to_" + exprInfo.deviceList[1] + "_fig2.png"
        },
        {
            label: exprInfo.deviceList[0] + " to " + exprInfo.deviceList[1] + " 第二段声音",
            value: exprInfo.deviceList[0] + "_to_" + exprInfo.deviceList[1] + "_fig3.png"
        },
        {
            label: exprInfo.deviceList[0] + " to " + exprInfo.deviceList[1] + " 第一段互相关",
            value: exprInfo.deviceList[0] + "_to_" + exprInfo.deviceList[1] + "_fig4.png"
        },
        {
            label: exprInfo.deviceList[0] + " to " + exprInfo.deviceList[1] + " 第一段峰值选择",
            value: exprInfo.deviceList[0] + "_to_" + exprInfo.deviceList[1] + "_fig5.png"
        },
        {
            label: exprInfo.deviceList[0] + " to " + exprInfo.deviceList[1] + " 第二段互相关",
            value: exprInfo.deviceList[0] + "_to_" + exprInfo.deviceList[1] + "_fig6.png"
        },
        {
            label: exprInfo.deviceList[0] + " to " + exprInfo.deviceList[1] + " 第二段峰值选择",
            value: exprInfo.deviceList[0] + "_to_" + exprInfo.deviceList[1] + "_fig7.png"
        },
        {
            label: exprInfo.deviceList[1] + " to " + exprInfo.deviceList[0] + " 原始信号",
            value: exprInfo.deviceList[1] + "_to_" + exprInfo.deviceList[0] + "_fig1.png"
        },
        {
            label: exprInfo.deviceList[1] + " to " + exprInfo.deviceList[0] + " 第一段声音",
            value: exprInfo.deviceList[1] + "_to_" + exprInfo.deviceList[0] + "_fig2.png"
        },
        {
            label: exprInfo.deviceList[1] + " to " + exprInfo.deviceList[0] + " 第二段声音",
            value: exprInfo.deviceList[1] + "_to_" + exprInfo.deviceList[0] + "_fig3.png"
        },
        {
            label: exprInfo.deviceList[1] + " to " + exprInfo.deviceList[0] + " 第一段互相关",
            value: exprInfo.deviceList[1] + "_to_" + exprInfo.deviceList[0] + "_fig4.png"
        },
        {
            label: exprInfo.deviceList[1] + " to " + exprInfo.deviceList[0] + " 第一段峰值选择",
            value: exprInfo.deviceList[1] + "_to_" + exprInfo.deviceList[0] + "_fig5.png"
        },
        {
            label: exprInfo.deviceList[1] + " to " + exprInfo.deviceList[0] + " 第二段互相关",
            value: exprInfo.deviceList[1] + "_to_" + exprInfo.deviceList[0] + "_fig6.png"
        },
        {
            label: exprInfo.deviceList[1] + " to " + exprInfo.deviceList[0] + " 第二段峰值选择",
            value: exprInfo.deviceList[1] + "_to_" + exprInfo.deviceList[0] + "_fig7.png"
        }
    ]

    const defaultOptions = [
        exprInfo.deviceList[0] + " to " + exprInfo.deviceList[1] + " 第一段互相关"
    ]

    const [selectedImgUrl, setSelectedImgUrl] = useState(null);

    let dataCardList = [];
    if (selectedImgUrl != null)
        dataCardList = exprInfo.exprIdList.map((exprId) => {
            const singleExprInfo = {
                id: exprId,
                result: 0,
                std: 0,
                imgUrlList: selectedImgUrl.map((url) => {
                    return getServerAddr() + "/experiment/type1/" + exprId + "/" + url;
                })
            }
            return <DataCard key={exprId} exprInfo={singleExprInfo}/>
        })


    return (
        <Collapse style={{marginTop: 24}}>
            <Panel header={header}>
                <Select
                    mode={"multiple"}
                    allowClear
                    style={{width: '100%'}}
                    placeholder="Please select"
                    options={options}
                    // defaultValue={defaultOptions}
                    onChange={(value) => {
                        console.log(value);
                        setSelectedImgUrl(value);
                    }}
                >

                </Select>

                <div style={{
                    width: "100%",
                    overflowX: "scroll",
                    overflowY: "hidden",
                    whiteSpace: "nowrap"
                }}
                     onWheel={onWheelHandler}
                     onMouseEnter={onMouseEnterHandler}
                     onMouseLeave={onMouseLeaveHandler}
                >
                    {dataCardList}

                </div>

            </Panel>
        </Collapse>
    );
}

export {DataGroupCard};