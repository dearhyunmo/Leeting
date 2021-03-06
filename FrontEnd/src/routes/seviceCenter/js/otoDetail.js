import React, { useState, useEffect } from 'react';
import axios from "axios";
import propTypes from "prop-types";

import { Link } from "react-router-dom";
import { Editor } from '@toast-ui/react-editor';

import moment from 'moment';
import 'moment/locale/ko';

const OtoDetail = (props) => {
    const [no, setNo] = useState(0);
    const [type, setType] = useState(1);
    const [title, setTitle] = useState("test");
    const [detail, setDetail] = useState("test");
    const [qwriter, setQwriter] = useState("Test");
    const [date, setDate] = useState("t");
    const [answer, setAnswer] = useState();
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState();
    const [content, setContent] = useState();
    const editorRef = React.createRef();
    const { location } = props;
    const sId = sessionStorage.getItem('id');

    useEffect(() => {
        
        const showDetail = async () => {
            setLoading(true);
            const res = await axios.get('http://127.0.0.1:8080/myapp/question/' + location.state.no);
            if (sessionStorage.getItem('id') === null) {
                document.getElementById('root').setAttribute('style', 'display:none');
                window.location.replace("/WrongPage");
            }
            // console.log(res.data.qwriter);
            if (sessionStorage.getItem('id') !== res.data.qwriter) {
                if (sessionStorage.getItem('id') !== 'leetingadmin') {
                    document.getElementById('root').setAttribute('style', 'display:none');
                    window.location.replace("/WrongPage");   
                }
            }
            setNo(res.data.no);
            setType(res.data.type);
            setTitle(res.data.title);
            setDetail(res.data.detail);
            setQwriter(res.data.qwriter);
            setDate(res.data.date);
        }
        
        const showAnswer = async () => {
            const res = await axios.get('http://127.0.0.1:8080/myapp/answer/' + location.state.no);
            
            setLoading(false);
            
            if (res.data.conclusion === "FAIL") {
                document.getElementById('otoAnswer').setAttribute('style', 'display:none');
                if (sId === 'leetingadmin') {
                    document.getElementById('adminWrite').setAttribute('style', 'display:inline-block');
                    document.getElementById('adminModify').setAttribute('style', 'display:none');
                } else {
                    document.getElementById('adminWrite').setAttribute('style', 'display:none');
                    document.getElementById('adminModify').setAttribute('style', 'display:none');
                }
            } else {
                setAnswer(res.data.answer.detail);
                if (sId === 'leetingadmin') {
                    document.getElementById('adminWrite').setAttribute('style', 'display:none');
                    document.getElementById('adminModify').setAttribute('style', 'display:inline-block');
                } else {
                    document.getElementById('adminWrite').setAttribute('style', 'display:none');
                    document.getElementById('adminModify').setAttribute('style', 'display:none');
                }
            }
        }
        
        if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
        }
        showDetail();
        showAnswer();
        // eslint-disable-next-line
    }, [update])
    
    var typeString;
    if (type === 1) {
        typeString = "??????"
    } else if (type === 2) {
        typeString = "??????"
    } else if (type === 3) {
        typeString = "?????????"
    } else {
        typeString = "??????"
    }

    const adminWrite = (e) => {
        e.preventDefault();
        
        document.getElementById('adminAnswer').setAttribute('style', 'display:table');
        document.getElementById('writeCancle').setAttribute('style', 'display:inline-block');
        document.getElementById('adminWrited').setAttribute('style', 'display:inline-block');
    }

    const adminWrited = (e) => {
        e.preventDefault();
        
        axios.post('http://127.0.0.1:8080/myapp/answer/writeanswer', {
            questionno: no,
            detail: content,
            date:moment()
        }).then(res => {
            if (res.data === "SUCCESS") {
                alert('?????? ????????? ?????????????????????!');
                setUpdate(!update);
                // editorRef.current.getInstance().setHtml(content);
            } else {
                alert('?????? ????????? ?????????????????????. ?????? ??????????????????!');
                editorRef.current.getInstance().setHtml("");
            }
        });
    }

    const writeCancle = (e) => {
        e.preventDefault();

        document.getElementById('adminAnswer').setAttribute('style', 'display:none');
        document.getElementById('writeCancle').setAttribute('style', 'display:none');
        document.getElementById('adminWrited').setAttribute('style', 'display:none');
    }

    const adminModify = (e) => {
        e.preventDefault();

        document.getElementById('otoAnswer').setAttribute('style', 'display:none');
        document.getElementById('adminAnswer').setAttribute('style', 'display:table');
        document.getElementById('adminModified').setAttribute('style', 'display:inline-block');
        document.getElementById('modifyCancle').setAttribute('style', 'display:inline-block');
    }

    const adminModified = (e) => {
        e.preventDefault();
        
        axios.put('http://127.0.0.1:8080/myapp/answer/modify/'+no, {
            questionno: no,
            detail: content,
            date:moment()
        }).then(res => {
            if (res.data === "SUCCESS") {
                alert('?????? ????????? ?????????????????????!');
                setUpdate(!update);
            } else {
                alert('?????? ????????? ?????????????????????. ?????? ??????????????????!');
                editorRef.current.getInstance().setHtml("");
            }
        });
    }

    const modifyCancle = (e) => {
        e.preventDefault();
        
        document.getElementById('otoAnswer').setAttribute('style', 'display:table');
        document.getElementById('adminAnswer').setAttribute('style', 'display:none');
        document.getElementById('adminModified').setAttribute('style', 'display:none');
        document.getElementById('modifyCancle').setAttribute('style', 'display:none');
    }

    const deleteQ = (e) => {
        e.preventDefault();
        
        axios.delete('http://127.0.0.1:8080/myapp/question/delete/'+no, {
            questionno: no,
            no: no
        }).then(res => {
            if (res.data === "SUCCESS") {
                alert('???????????? ????????? ?????????????????????!');
                window.location.replace('/sc/onetoone');
            } else {
                alert('???????????? ????????? ?????????????????????. ?????? ??????????????????!');
            }
        });
    }

    const editorChange = (e) => { 
        setContent(editorRef.current.getInstance().getHtml());
    }

    if (loading) {
        return (
            <div id="main_content">
                <div className="loading_view">
                    <div className="loader loader-7">
                        <div className="line line1"></div>
                        <div className="line line2"></div>
                        <div className="line line3"></div>
                        <span className="loader_text">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            
            <div id="main_content">
                <div className="otoInput otoWrap">
                    <div className="otoTitle">
                        <h1>{qwriter}?????? ?????????????????????.</h1>
                    </div>
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">?????? ??????</th>
                                <td colSpan="2">
                                    <div>{title}</div>
                                </td>
                                <th scope="row">?????? ????????????</th>
                                <td colSpan="2">
                                    <div>{typeString}</div>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">?????? ??????</th>
                                    <td colSpan="5">
                                    <div className="otoDetail" id="otoDetail" dangerouslySetInnerHTML={{ __html: detail }}></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="otoAnswer">
                        <thead>
                        </thead>
                        <tbody>
                            <tr className="Answer">
                                <th scope="row">???  ???</th>
                                    <td colSpan="5">
                                    <div className="otoDetail" dangerouslySetInnerHTML={{ __html: answer }}></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="adminAnswer">
                        <thead>
                        </thead>
                        <tbody>
                            <tr className="Answer">
                                <th scope="row">???  ???</th>
                                    <td colSpan="5">
                                    <div className="inputAnswer">                                        
                                        <Editor
                                            className="editorr"
                                            previewStyle="vertical"
                                            height="300px"
                                            placeholder="?????? ??????????????????."
                                            initialEditType="wysiwyg"
                                            ref={editorRef}
                                            onChange={editorChange}
                                            initialValue={content}
                                        /> 
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="otoBtns">
                        <GoModify
                            no={no}
                            type={type}
                            title={title}
                            detail={detail}
                            qwriter={qwriter}
                            date={date}
                        />
                        <button className="Answer" id="adminWrite" onClick={adminWrite}>?????? ??????</button>
                        <button className="Answer" id="adminWrited" onClick={adminWrited}>?????? ??????</button>
                        <button className="Answer" id="writeCancle" onClick={writeCancle}>?????? ??????</button>
                        <button className="Answer" id="adminModify" onClick={adminModify}>?????? ??????</button>
                        <button className="Answer" id="adminModified" onClick={adminModified}>?????? ??????</button>
                        <button className="Answer" id="modifyCancle" onClick={modifyCancle}>?????? ??????</button>
                        <button className="Delete" onClick={deleteQ}>????????????</button>
                    </div>
                </div>
            </div>
        )
    }
}

function GoModify({ no, type, title, detail, qwriter, date }) {
    return (
        <div id="modifyBtn">
            <Link
                to={{
                    pathname: `/sc/otomodify/${no}`,
                    state: {
                        no,
                        type,
                        title,
                        detail,
                        qwriter,
                        date
                    }
                }}
            >
                <button className="Answer" id="userModify" >?????? ??????</button>
            </Link>
        </div>
    )
}

GoModify.propTypes = {
    no : propTypes.number.isRequired,
    type : propTypes.number.isRequired,
    title : propTypes.string.isRequired,
    detail : propTypes.string.isRequired,
    qwriter : propTypes.string.isRequired,
    date : propTypes.string.isRequired
};    

export default OtoDetail;