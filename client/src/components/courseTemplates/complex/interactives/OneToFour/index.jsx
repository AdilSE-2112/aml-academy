import React, { useState, useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { motion, useAnimation } from 'framer-motion';

import './style.scss'
import Sizebox from '../../../common/Sizebox';

function OneToFour({
    header,
    list
}) {
    const [open, setOpen] = useState(false)
    const mainControls = useAnimation();

    useEffect(() => {

        if (open) {
            mainControls.start('visible')
        } else {
            mainControls.start('hidden')
        }

    }, [open])

    return ( 
        <div className="one-to-four">
            <div className="wrapper">
                <div className="oneToFour">
                    <div className="header-wrapper">
                        <div className="header">
                            <div className="text">{header}</div>
                            <div className="open" onClick={() => setOpen(prev => !prev)}>
                                {   
                                    open 
                                        ? <AiOutlineMinus 
                                            size={23}
                                            
                                            />
                                        : <AiOutlinePlus 
                                            size={23}
                                        />
                                }
                            </div>
                        </div>
                    </div>
                    <Sizebox height={51} />
                    <motion.div className="body"
                        variants={{
                            hidden: {
                                height: 0,
                                paddingTop: 0,
                                paddingBottom: 0
                            },
                            visible: {
                                height: 'max-content',
                                paddingTop: '10px',
                                paddingBottom: '10px'
                            }
                        }}
                        initial='hidden'
                        animate={mainControls}
                    >
                        {
                            list ? list.map((item, index) => {

                                return (
                                    <div></div>
                                )
                            }) : null
                        }
                    </motion.div>
                </div>
            </div>
            
        </div>
    );
}

export default OneToFour;