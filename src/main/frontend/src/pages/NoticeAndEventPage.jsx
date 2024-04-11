

function NoticeAndEventPage(){
    return(
        <div id="newsPage-container">
            <div>
                <span>담다소식</span>
                <p>
                    <button>공지사항</button>
                </p>
                <p>
                    <button>이벤트</button>
                </p>
            </div>
            <div>
                <div id="news-flex">
                    <span>번호</span>
                    <span>제목</span>
                    <span>등록일</span>
                </div>
                <hr/>
            </div>
        </div>
    )

}

export default NoticeAndEventPage;