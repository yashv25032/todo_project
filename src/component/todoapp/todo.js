import React, { useEffect, useState } from 'react';
import "./style.css";

const getlocalstorage = () => {
    const list = localStorage.getItem('mytodolist');
    if (list) {
        return JSON.parse(list);
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputdata, setinputdata] = useState("");
    const [items, setItemdata] = useState(getlocalstorage());
    const [itemEdit, setIsEdititem] = useState("");
    const [togglebutton, setToggleButton] = useState(false);

    const additems = () => {
        if (!inputdata) {
            alert("fill this input");
        }else if(inputdata && togglebutton){
            setItemdata(
                items.map((curElem)=>{
                    if (curElem.id === itemEdit ){
                        return { ...curElem , name:inputdata };
                    }
                    return curElem;
                })
            );

            setinputdata("");
            setIsEdititem(null);
            setToggleButton(false);
        }else {
            const myinputdata = {
                id: new Date().getTime().toString(),
                name: inputdata,
            }
            setItemdata([...items, myinputdata]);
            setinputdata("");
        };
    };

    const editItems = (index) => {
        const todo_edited = items.find((curElem) => {
            return curElem.id === index;

        });

        setinputdata(todo_edited.name);
        setIsEdititem(index);
        setToggleButton(true);

    };



    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItemdata(updatedItems);

    };

    const removeAll = () => {
        return setItemdata([]);
    }

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src="./image/todo.svg" alt="todo" />
                        <figcaption>ADD Your List Here </figcaption>

                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="Add Items" value={inputdata} onChange={(event) => setinputdata(event.target.value
                        )} className="form-control" />

                        {togglebutton ? (
                            <i className="fas fa-edit add-btn" onClick={additems} ></i>

                        ) : (<i className="fas fa-plus add-btn" onClick={additems} ></i>
                        )
                        }


                    </div>

                    {items.map((curElem, index) => {
                        return (

                            <div className='showItems' key={curElem.id}>
                                <div className='eachItem'>
                                    <h3>{curElem.name}</h3>
                                    <div className='todo-btn'>
                                        <i className="far fa-edit add-btn" onClick={() => editItems(curElem.id)}></i>
                                        <i className="fas fa-trash axdd-btn" onClick={() => deleteItem(curElem.id)}></i>

                                    </div>
                                </div>

                            </div>

                        )
                    })}


                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span> CHECK LIST </span></button>

                    </div>
                </div>

            </div>
        </>
    );
}

export default Todo;
