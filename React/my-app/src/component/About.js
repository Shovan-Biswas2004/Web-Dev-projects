import React,{useState} from "react";

export default function About() {

    const [myStyle, setStyle] = useState({
        color:"white",
        backgroundColor: "grey"
    });
    
     const [btnText, setBtnText] = useState("Disable Dark mode")

    const toggleStyle = ()=>{
       if(myStyle.color === "white"){
         setStyle({
        color:"black",
        backgroundColor: "white"
    });
       setBtnText("Enable Dark mode")
       }
       else{
        setStyle({
        color:"white",
        backgroundColor: "grey"
    });
        setBtnText("Disable Dark mode")
       }
    }

    return (
        <> <div className="container"style={myStyle} >
            <div className="accordion py-3" id="accordionPanelsStayOpenExample" style={myStyle}>
                <div className="accordion-item" >
                    <h2 className="accordion-header">
                        <button
                           className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseOne"
                            aria-expanded="true"
                            aria-controls="panelsStayOpen-collapseOne"
                            style={myStyle}
                        >
                            Accordion Item #1
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseOne"
                       className="accordion-collapse collapse show"
                    >
                        <div className="accordion-body">
                            <strong>This is the first item’s accordion body.</strong> It is
                            shown by default, until the collapse plugin adds the appropriate
                            classes that we use to style each element. These classes control
                            the overall appearance, as well as the showing and hiding via CSS
                            transitions. You can modify any of this with custom CSS or
                            overriding our default variables. It’s also worth noting that just
                            about any HTML can go within the <code>.accordion-body</code>,
                            though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                           className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseTwo"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseTwo"
                            style={myStyle}
                        >
                            Accordion Item #2
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseTwo"
                       className="accordion-collapse collapse"
                    >
                        <div className="accordion-body">
                            <strong>This is the second item’s accordion body.</strong> It is
                            hidden by default, until the collapse plugin adds the appropriate
                            classes that we use to style each element. These classes control
                            the overall appearance, as well as the showing and hiding via CSS
                            transitions. You can modify any of this with custom CSS or
                            overriding our default variables. It’s also worth noting that just
                            about any HTML can go within the <code>.accordion-body</code>,
                            though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                           className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapseThree"
                            aria-expanded="false"
                            aria-controls="panelsStayOpen-collapseThree"
                            style={myStyle}
                        >
                            Accordion Item #3
                        </button>
                    </h2>
                    <div
                        id="panelsStayOpen-collapseThree"
                       className="accordion-collapse collapse"
                    >
                        <div className="accordion-body">
                            <strong>This is the third item’s accordion body.</strong> It is
                            hidden by default, until the collapse plugin adds the appropriate
                            classes that we use to style each element. These classes control
                            the overall appearance, as well as the showing and hiding via CSS
                            transitions. You can modify any of this with custom CSS or
                            overriding our default variables. It’s also worth noting that just
                            about any HTML can go within the <code>.accordion-body</code>,
                            though the transition does limit overflow.
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-2">
            <button className="btn btn-dark" onClick={toggleStyle}>{btnText}</button>
            </div>
        </div>
        </>
    );
}
