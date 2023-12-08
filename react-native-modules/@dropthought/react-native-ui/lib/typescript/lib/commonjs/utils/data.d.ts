export var __esModule: boolean;
export type QuestionBrandType = 'Date' | 'Name' | 'Email' | 'Phone' | 'Number' | 'String';
export type QuestionBrandType = 'other';
export namespace QuestionBrandType {
    const Other: string;
}
export namespace QuestionMetaDataType {
    const Name: string;
    const Email: string;
    const Phone: string;
    const Number: string;
    const Date: string;
    const String: string;
}
/**
 * given a Question type, return ['option label1', 'option label2', 'option label3', true]
 * if the type is boolean at the last, it means it is an "other" option
 */
export function getOptionsFromQuestion(question: any): any;
export function metaDataFormatValidator(value: any, metaDataType: any): boolean;
export function mandatoryQuestionValidator(question: any, feedback?: {}): any;
export function getRequiredType(question: any): "none" | "all" | "one";
export function questionFeedbackValidator(question: any, feedback: any): any;
export const scaleLogic: {
    '2': number[];
    '3': number[];
    '4': number[];
    '5': number[];
};
export const option4FaceTable: string[];
export const option3LoopFaceTable: Map<string, {
    v: string;
    meta: {
        g: string;
        a: string;
        k: string;
        d: string;
        tc: string;
    };
    fr: number;
    ip: number;
    op: number;
    w: number;
    h: number;
    nm: string;
    ddd: number;
    assets: never[];
    layers: ({
        ddd: number;
        ind: number;
        ty: number;
        nm: string;
        sr: number;
        ks: {
            o: {
                a: number;
                k: number;
                ix: number;
            };
            r: {
                a: number;
                k: number;
                ix: number;
            };
            p: {
                a: number;
                k: number[];
                ix: number;
            };
            a: {
                a: number;
                k: number[];
                ix: number;
            };
            s: {
                a: number;
                k: number[];
                ix: number;
            };
        };
        ao: number;
        shapes: ({
            ty: string;
            it: ({
                ind: number;
                ty: string;
                ix: number;
                ks: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: {
                            i: number[][];
                            o: number[][];
                            v: number[][];
                            c: boolean;
                        }[];
                    } | {
                        t: number;
                        s: {
                            i: number[][];
                            o: number[][];
                            v: number[][];
                            c: boolean;
                        }[]; /** @enum {'Date'|'Name'|'Email'|'Phone'|'Number'|'String'} */
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                nm: string;
                mn: string;
                hd: boolean;
                c?: undefined;
                o?: undefined;
                w?: undefined;
                lc?: undefined;
                lj?: undefined;
                ml?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                c: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                w: {
                    a: number;
                    k: number;
                    ix: number;
                };
                lc: number;
                lj: number;
                ml: number;
                bm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mn?: undefined;
                hd?: undefined;
                c?: undefined;
                w?: undefined;
                lc?: undefined;
                lj?: undefined;
                ml?: undefined;
                bm?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ty: string;
                it: ({
                    ind: number;
                    ty: string;
                    ix: number;
                    ks: {
                        a: number;
                        k: {
                            i: number[][];
                            o: number[][];
                            v: number[][];
                            c: boolean;
                        };
                        ix: number;
                    };
                    nm: string;
                    mn: string;
                    hd: boolean;
                    c?: undefined;
                    o?: undefined;
                    r?: undefined;
                    bm?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    c: {
                        a: number;
                        k: ({
                            i: {
                                x: number[];
                                y: number[];
                            };
                            o: {
                                x: number[];
                                y: number[];
                            };
                            t: number;
                            s: number[];
                        } | {
                            t: number;
                            s: number[];
                            i?: undefined;
                            o?: undefined;
                        })[];
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    r: number;
                    bm: number;
                    nm: string;
                    mn: string;
                    hd: boolean;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    p: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    a: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    s: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    r: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sk: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sa: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    nm: string;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    mn?: undefined;
                    hd?: undefined;
                    c?: undefined;
                    bm?: undefined;
                })[];
                nm: string;
                np: number;
                cix: number;
                bm: number;
                ix: number;
                mn: string;
                hd: boolean;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                o?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                it?: undefined;
                np?: undefined;
                cix?: undefined;
                bm?: undefined;
                ix?: undefined;
                mn?: undefined;
                hd?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ty: string;
                it: ({
                    ind: number;
                    ty: string;
                    ix: number;
                    ks: {
                        a: number;
                        k: {
                            i: number[][];
                            o: number[][];
                            v: number[][];
                            c: boolean;
                        };
                        ix: number;
                    };
                    nm: string;
                    mn: string;
                    hd: boolean;
                    c?: undefined;
                    o?: undefined;
                    w?: undefined;
                    lc?: undefined;
                    lj?: undefined;
                    ml?: undefined;
                    bm?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    r?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    c: {
                        a: number;
                        k: ({
                            i: {
                                x: number[];
                                y: number[];
                            };
                            o: {
                                x: number[];
                                y: number[];
                            };
                            t: number;
                            s: number[];
                        } | {
                            t: number;
                            s: number[];
                            i?: undefined;
                            o?: undefined;
                        })[];
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    w: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    lc: number;
                    lj: number;
                    ml: number;
                    bm: number;
                    nm: string;
                    mn: string;
                    hd: boolean;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    r?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    p: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    a: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    s: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    r: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sk: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sa: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    nm: string;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    mn?: undefined;
                    hd?: undefined;
                    c?: undefined;
                    w?: undefined;
                    lc?: undefined;
                    lj?: undefined;
                    ml?: undefined;
                    bm?: undefined;
                })[];
                nm: string;
                np: number;
                cix: number;
                bm: number;
                ix: number;
                mn: string;
                hd: boolean;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                o?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                it?: undefined;
                np?: undefined;
                cix?: undefined;
                bm?: undefined;
                ix?: undefined;
                mn?: undefined;
                hd?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ind: number;
                ty: string;
                ix: number;
                ks: {
                    a: number;
                    k: {
                        i: number[][];
                        o: number[][];
                        v: number[][];
                        c: boolean;
                    };
                    ix: number;
                };
                nm: string;
                mn: string;
                hd: boolean;
                mm?: undefined;
                c?: undefined;
                o?: undefined;
                r?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                mm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                c?: undefined;
                o?: undefined;
                r?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                c: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                r: number;
                bm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mn?: undefined;
                hd?: undefined;
                mm?: undefined;
                c?: undefined;
                bm?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        })[];
        ip: number;
        op: number;
        st: number;
        bm: number;
    } | {
        ddd: number;
        ind: number;
        ty: number;
        nm: string;
        sr: number;
        ks: {
            o: {
                a: number;
                k: number;
                ix: number;
            };
            r: {
                a: number;
                k: number;
                ix: number;
            };
            p: {
                a: number;
                k: number[];
                ix: number;
            };
            a: {
                a: number;
                k: number[];
                ix: number;
            };
            s: {
                a: number;
                k: number[];
                ix: number;
            };
        };
        ao: number;
        shapes: ({
            ty: string;
            it: ({
                ind: number;
                ty: string;
                ix: number;
                ks: {
                    a: number;
                    k: {
                        i: number[][];
                        o: number[][];
                        v: number[][];
                        c: boolean;
                    };
                    ix: number;
                };
                nm: string;
                mn: string;
                hd: boolean;
                c?: undefined;
                o?: undefined;
                w?: undefined;
                lc?: undefined;
                lj?: undefined;
                ml?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                c: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                w: {
                    a: number;
                    k: number;
                    ix: number;
                };
                lc: number;
                lj: number;
                ml: number;
                bm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mn?: undefined;
                hd?: undefined;
                c?: undefined;
                w?: undefined;
                lc?: undefined;
                lj?: undefined;
                ml?: undefined;
                bm?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ty: string;
                it: ({
                    ind: number;
                    ty: string;
                    ix: number;
                    ks: {
                        a: number;
                        k: {
                            i: number[][];
                            o: number[][];
                            v: number[][];
                            c: boolean;
                        };
                        ix: number;
                    };
                    nm: string;
                    mn: string;
                    hd: boolean;
                    c?: undefined;
                    o?: undefined;
                    r?: undefined;
                    bm?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    c: {
                        a: number;
                        k: ({
                            i: {
                                x: number[];
                                y: number[];
                            };
                            o: {
                                x: number[];
                                y: number[];
                            };
                            t: number;
                            s: number[];
                        } | {
                            t: number;
                            s: number[];
                            i?: undefined;
                            o?: undefined;
                        })[];
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    r: number;
                    bm: number;
                    nm: string;
                    mn: string;
                    hd: boolean;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    p: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    a: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    s: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    r: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sk: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sa: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    nm: string;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    mn?: undefined;
                    hd?: undefined;
                    c?: undefined;
                    bm?: undefined;
                })[];
                nm: string;
                np: number;
                cix: number;
                bm: number;
                ix: number;
                mn: string;
                hd: boolean;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                o?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                it?: undefined;
                np?: undefined;
                cix?: undefined;
                bm?: undefined;
                ix?: undefined;
                mn?: undefined;
                hd?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ty: string;
                it: ({
                    ind: number;
                    ty: string;
                    ix: number;
                    ks: {
                        a: number;
                        k: {
                            i: number[][];
                            o: number[][];
                            v: number[][];
                            c: boolean;
                        };
                        ix: number;
                    };
                    nm: string;
                    mn: string;
                    hd: boolean;
                    c?: undefined;
                    o?: undefined;
                    w?: undefined;
                    lc?: undefined;
                    lj?: undefined;
                    ml?: undefined;
                    bm?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    r?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    c: {
                        a: number;
                        k: ({
                            i: {
                                x: number[];
                                y: number[];
                            };
                            o: {
                                x: number[];
                                y: number[];
                            };
                            t: number;
                            s: number[];
                        } | {
                            t: number;
                            s: number[];
                            i?: undefined;
                            o?: undefined;
                        })[];
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    w: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    lc: number;
                    lj: number;
                    ml: number;
                    bm: number;
                    nm: string;
                    mn: string;
                    hd: boolean;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    r?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    p: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    a: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    s: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    r: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sk: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sa: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    nm: string;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    mn?: undefined;
                    hd?: undefined;
                    c?: undefined;
                    w?: undefined;
                    lc?: undefined;
                    lj?: undefined;
                    ml?: undefined;
                    bm?: undefined;
                })[];
                nm: string;
                np: number;
                cix: number;
                bm: number;
                ix: number;
                mn: string;
                hd: boolean;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                o?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                it?: undefined;
                np?: undefined;
                cix?: undefined;
                bm?: undefined;
                ix?: undefined;
                mn?: undefined;
                hd?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ind: number;
                ty: string;
                ix: number;
                ks: {
                    a: number;
                    k: {
                        i: number[][];
                        o: number[][];
                        v: number[][];
                        c: boolean;
                    };
                    ix: number;
                };
                nm: string;
                mn: string;
                hd: boolean;
                mm?: undefined;
                c?: undefined;
                o?: undefined;
                r?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                mm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                c?: undefined;
                o?: undefined;
                r?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                c: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                r: number;
                bm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mn?: undefined;
                hd?: undefined;
                mm?: undefined;
                c?: undefined;
                bm?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        })[];
        ip: number;
        op: number;
        st: number;
        bm: number;
    } | {
        ddd: number;
        ind: number;
        ty: number;
        nm: string;
        sr: number;
        ks: {
            o: {
                a: number;
                k: number;
                ix: number;
            };
            r: {
                a: number;
                k: number;
                ix: number;
            };
            p: {
                a: number;
                k: number[];
                ix: number;
            };
            a: {
                a: number;
                k: number[];
                ix: number;
            };
            s: {
                a: number;
                k: number[];
                ix: number;
            };
        };
        ao: number;
        shapes: ({
            ty: string;
            it: ({
                ind: number;
                ty: string;
                ix: number;
                ks: {
                    a: number;
                    k: {
                        i: number[][];
                        o: number[][];
                        v: number[][];
                        c: boolean;
                    };
                    ix: number;
                };
                nm: string;
                mn: string;
                hd: boolean;
                c?: undefined;
                o?: undefined;
                w?: undefined;
                lc?: undefined;
                lj?: undefined;
                ml?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                c: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                w: {
                    a: number;
                    k: number;
                    ix: number;
                };
                lc: number;
                lj: number;
                ml: number;
                bm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mn?: undefined;
                hd?: undefined;
                c?: undefined;
                w?: undefined;
                lc?: undefined;
                lj?: undefined;
                ml?: undefined;
                bm?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ty: string;
                it: ({
                    ind: number;
                    ty: string;
                    ix: number;
                    ks: {
                        a: number;
                        k: {
                            i: number[][];
                            o: number[][];
                            v: number[][];
                            c: boolean;
                        };
                        ix: number;
                    };
                    nm: string;
                    mn: string;
                    hd: boolean;
                    c?: undefined;
                    o?: undefined;
                    r?: undefined;
                    bm?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    c: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    r: number;
                    bm: number;
                    nm: string;
                    mn: string;
                    hd: boolean;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    p: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    a: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    s: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    r: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sk: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sa: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    nm: string;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    mn?: undefined;
                    hd?: undefined;
                    c?: undefined;
                    bm?: undefined;
                })[];
                nm: string;
                np: number;
                cix: number;
                bm: number;
                ix: number;
                mn: string;
                hd: boolean;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                o?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                it?: undefined;
                np?: undefined;
                cix?: undefined;
                bm?: undefined;
                ix?: undefined;
                mn?: undefined;
                hd?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ty: string;
                it: ({
                    ind: number;
                    ty: string;
                    ix: number;
                    ks: {
                        a: number;
                        k: {
                            i: number[][];
                            o: number[][];
                            v: number[][];
                            c: boolean;
                        };
                        ix: number;
                    };
                    nm: string;
                    mn: string;
                    hd: boolean;
                    c?: undefined;
                    o?: undefined;
                    w?: undefined;
                    lc?: undefined;
                    lj?: undefined;
                    ml?: undefined;
                    bm?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    r?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    c: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    w: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    lc: number;
                    lj: number;
                    ml: number;
                    bm: number;
                    nm: string;
                    mn: string;
                    hd: boolean;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    r?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    p: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    a: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    s: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    r: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sk: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sa: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    nm: string;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    mn?: undefined;
                    hd?: undefined;
                    c?: undefined;
                    w?: undefined;
                    lc?: undefined;
                    lj?: undefined;
                    ml?: undefined;
                    bm?: undefined;
                })[];
                nm: string;
                np: number;
                cix: number;
                bm: number;
                ix: number;
                mn: string;
                hd: boolean;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                o?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                it?: undefined;
                np?: undefined;
                cix?: undefined;
                bm?: undefined;
                ix?: undefined;
                mn?: undefined;
                hd?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ind: number;
                ty: string;
                ix: number;
                ks: {
                    a: number;
                    k: {
                        i: number[][];
                        o: number[][];
                        v: number[][];
                        c: boolean;
                    };
                    ix: number;
                };
                nm: string;
                mn: string;
                hd: boolean;
                mm?: undefined;
                c?: undefined;
                o?: undefined;
                r?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                mm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                c?: undefined;
                o?: undefined;
                r?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                c: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                r: number;
                bm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mn?: undefined;
                hd?: undefined;
                mm?: undefined;
                c?: undefined;
                bm?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ind: number;
                ty: string;
                ix: number;
                ks: {
                    a: number;
                    k: {
                        i: number[][];
                        o: number[][];
                        v: number[][];
                        c: boolean;
                    };
                    ix: number;
                };
                nm: string;
                mn: string;
                hd: boolean;
                c?: undefined;
                o?: undefined;
                r?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                c: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                r: number;
                bm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mn?: undefined;
                hd?: undefined;
                c?: undefined;
                bm?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        })[];
        ip: number;
        op: number;
        st: number;
        bm: number;
    })[];
    markers: never[];
}>;
export const option4LoopFaceTable: Map<string, {
    v: string;
    meta: {
        g: string;
        a: string;
        k: string;
        d: string;
        tc: string;
    };
    fr: number;
    ip: number;
    op: number;
    w: number;
    h: number;
    nm: string;
    ddd: number;
    assets: never[];
    layers: {
        ddd: number;
        ind: number;
        ty: number;
        nm: string;
        sr: number;
        ks: {
            o: {
                a: number;
                k: number;
                ix: number;
            };
            r: {
                a: number;
                k: number;
                ix: number;
            };
            p: {
                a: number;
                k: number[];
                ix: number;
            };
            a: {
                a: number;
                k: number[];
                ix: number;
            };
            s: {
                a: number;
                k: number[];
                ix: number;
            };
        };
        ao: number;
        shapes: ({
            ty: string;
            it: ({
                ind: number;
                ty: string;
                ix: number;
                ks: {
                    a: number;
                    k: {
                        i: number[][];
                        o: number[][];
                        v: number[][];
                        c: boolean;
                    };
                    ix: number;
                };
                nm: string;
                mn: string;
                hd: boolean;
                c?: undefined;
                o?: undefined;
                r?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                c: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                r: number;
                bm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    /** @enum {'Date'|'Name'|'Email'|'Phone'|'Number'|'String'} */
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mn?: undefined;
                hd?: undefined;
                c?: undefined;
                bm?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ind: number;
                ty: string;
                ix: number;
                ks: {
                    a: number;
                    k: {
                        i: number[][];
                        o: number[][];
                        v: number[][];
                        c: boolean;
                    };
                    ix: number;
                };
                nm: string;
                mn: string;
                hd: boolean;
                c?: undefined;
                o?: undefined;
                r?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                c: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                r: number;
                bm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mn?: undefined;
                hd?: undefined;
                c?: undefined;
                bm?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ty: string;
                it: ({
                    ind: number;
                    ty: string;
                    ix: number;
                    ks: {
                        a: number;
                        k: {
                            i: number[][];
                            o: number[][];
                            v: number[][];
                            c: boolean;
                        };
                        ix: number;
                    };
                    nm: string;
                    mn: string;
                    hd: boolean;
                    c?: undefined;
                    o?: undefined;
                    r?: undefined;
                    bm?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    c: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    r: number;
                    bm: number;
                    nm: string;
                    mn: string;
                    hd: boolean;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    p: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    a: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    s: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    r: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sk: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sa: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    nm: string;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    mn?: undefined;
                    hd?: undefined;
                    c?: undefined;
                    bm?: undefined;
                })[];
                nm: string;
                np: number;
                cix: number;
                bm: number;
                ix: number;
                mn: string;
                hd: boolean;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                o?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    /**
                     * validate if question's feedback is valid:
                     * metadata type value check, mandatory check
                     */
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                it?: undefined;
                np?: undefined;
                cix?: undefined;
                bm?: undefined;
                ix?: undefined;
                mn?: undefined;
                hd?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ty: string;
                it: ({
                    ind: number;
                    ty: string;
                    ix: number;
                    ks: {
                        a: number;
                        k: {
                            i: number[][];
                            o: number[][];
                            v: number[][];
                            c: boolean;
                        };
                        ix: number;
                    };
                    nm: string;
                    mn: string;
                    hd: boolean;
                    c?: undefined;
                    o?: undefined;
                    r?: undefined;
                    bm?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    c: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    r: number;
                    bm: number;
                    nm: string;
                    mn: string;
                    hd: boolean;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    p: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    a: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    s: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    r: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sk: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sa: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    nm: string;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    mn?: undefined;
                    hd?: undefined;
                    c?: undefined;
                    bm?: undefined;
                })[];
                nm: string;
                np: number;
                cix: number;
                bm: number;
                ix: number;
                mn: string;
                hd: boolean;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                o?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                it?: undefined;
                np?: undefined;
                cix?: undefined;
                bm?: undefined;
                ix?: undefined;
                mn?: undefined;
                hd?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ty: string;
                it: ({
                    ind: number;
                    ty: string;
                    ix: number;
                    ks: {
                        a: number;
                        k: {
                            i: number[][];
                            o: number[][];
                            v: number[][];
                            c: boolean;
                        };
                        ix: number;
                    };
                    nm: string;
                    mn: string;
                    hd: boolean;
                    c?: undefined;
                    o?: undefined;
                    r?: undefined;
                    bm?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    c: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    r: number;
                    bm: number;
                    nm: string;
                    mn: string;
                    hd: boolean;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    p: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    a: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    s: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    r: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sk: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sa: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    nm: string;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    mn?: undefined;
                    hd?: undefined;
                    c?: undefined;
                    bm?: undefined;
                })[];
                nm: string;
                np: number;
                cix: number;
                bm: number;
                ix: number;
                mn: string;
                hd: boolean;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                o?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                it?: undefined;
                np?: undefined;
                cix?: undefined;
                bm?: undefined;
                ix?: undefined;
                mn?: undefined;
                hd?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ind: number;
                ty: string;
                ix: number;
                ks: {
                    a: number;
                    k: {
                        i: number[][];
                        o: number[][];
                        v: number[][];
                        c: boolean;
                    };
                    ix: number;
                };
                nm: string;
                mn: string;
                hd: boolean;
                c?: undefined;
                o?: undefined;
                r?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                c: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                r: number;
                bm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mn?: undefined;
                hd?: undefined;
                c?: undefined;
                bm?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        })[];
        ip: number;
        op: number;
        st: number;
        bm: number;
    }[];
    markers: never[];
}>;
export const option4TransformTable: Map<string, {
    v: string;
    meta: {
        g: string;
        a: string;
        k: string;
        d: string;
        tc: string;
    };
    fr: number;
    ip: number;
    op: number;
    w: number;
    h: number;
    nm: string;
    ddd: number;
    assets: never[];
    layers: ({
        ddd: number;
        ind: number;
        ty: number;
        nm: string;
        sr: number;
        ks: {
            o: {
                a: number;
                k: ({
                    i: {
                        x: number[];
                        y: number[];
                    };
                    o: {
                        x: number[];
                        y: number[];
                    };
                    t: number;
                    s: number[];
                } | {
                    t: number;
                    s: number[];
                    i?: undefined;
                    o?: undefined;
                })[];
                ix: number;
            };
            r: {
                a: number;
                k: number;
                ix: number;
            };
            p: {
                a: number;
                k: number[];
                ix: number;
            };
            a: {
                a: number;
                k: number[];
                ix: number;
            };
            s: {
                a: number;
                k: number[];
                ix: number;
            };
        };
        ao: number;
        shapes: ({
            ty: string;
            it: ({
                ind: number;
                ty: string;
                ix: number;
                ks: {
                    a: number;
                    k: {
                        i: number[][];
                        o: number[][];
                        v: number[][];
                        c: boolean;
                    };
                    ix: number;
                };
                nm: string;
                mn: string;
                hd: boolean;
                c?: undefined;
                o?: undefined;
                r?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                c: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                r: number;
                bm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        /**
                         * given a Question type, return ['option label1', 'option label2', 'option label3', true]
                         * if the type is boolean at the last, it means it is an "other" option
                         */
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mn?: undefined;
                hd?: undefined;
                c?: undefined;
                bm?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ty: string;
                it: ({
                    ty: string;
                    it: ({
                        ind: number;
                        ty: string;
                        ix: number;
                        ks: {
                            a: number;
                            k: {
                                i: number[][];
                                o: number[][];
                                v: number[][];
                                c: boolean;
                            };
                            ix: number;
                        };
                        nm: string;
                        mn: string;
                        hd: boolean;
                        c?: undefined;
                        o?: undefined;
                        r?: undefined;
                        bm?: undefined;
                        p?: undefined;
                        a?: undefined;
                        s?: undefined;
                        sk?: undefined;
                        sa?: undefined;
                    } | {
                        ty: string;
                        c: {
                            a: number;
                            k: number[];
                            ix: number;
                        };
                        o: {
                            a: number;
                            k: number;
                            ix: number;
                        };
                        r: number;
                        bm: number;
                        nm: string;
                        mn: string;
                        hd: boolean;
                        ind?: undefined;
                        ix?: undefined;
                        ks?: undefined;
                        p?: undefined;
                        a?: undefined;
                        s?: undefined;
                        sk?: undefined;
                        sa?: undefined;
                    } | {
                        ty: string;
                        p: {
                            a: number;
                            k: number[];
                            ix: number;
                        };
                        a: {
                            a: number;
                            k: number[];
                            ix: number;
                        };
                        s: {
                            a: number;
                            k: number[];
                            ix: number;
                        };
                        r: {
                            a: number;
                            k: number;
                            ix: number;
                        };
                        o: {
                            a: number;
                            k: number;
                            ix: number;
                        };
                        sk: {
                            a: number;
                            k: number;
                            ix: number;
                        };
                        sa: {
                            a: number;
                            k: number;
                            ix: number;
                        };
                        nm: string;
                        ind?: undefined;
                        ix?: undefined;
                        ks?: undefined;
                        mn?: undefined;
                        hd?: undefined;
                        c?: undefined;
                        bm?: undefined;
                    })[];
                    nm: string;
                    np: number;
                    cix: number;
                    bm: number;
                    ix: number;
                    mn: string;
                    hd: boolean;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    r?: undefined;
                    o?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    p: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    a: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    s: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    r: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sk: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sa: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    nm: string;
                    it?: undefined;
                    np?: undefined;
                    cix?: undefined;
                    bm?: undefined;
                    ix?: undefined;
                    mn?: undefined;
                    hd?: undefined;
                })[];
                nm: string;
                np: number;
                cix: number;
                bm: number;
                ix: number;
                mn: string;
                hd: boolean;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                o?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                it?: undefined;
                np?: undefined;
                cix?: undefined;
                bm?: undefined;
                ix?: undefined;
                mn?: undefined;
                hd?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ty: string;
                it: ({
                    ind: number;
                    ty: string;
                    ix: number;
                    ks: {
                        a: number;
                        k: {
                            i: number[][];
                            o: number[][];
                            v: number[][];
                            c: boolean;
                        };
                        ix: number;
                    };
                    nm: string;
                    mn: string;
                    hd: boolean;
                    c?: undefined;
                    o?: undefined;
                    r?: undefined;
                    bm?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    c: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    r: number;
                    bm: number;
                    nm: string;
                    mn: string;
                    hd: boolean;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    p: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    a: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    s: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    r: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sk: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sa: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    nm: string;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    mn?: undefined;
                    hd?: undefined;
                    c?: undefined;
                    bm?: undefined;
                })[];
                nm: string;
                np: number;
                cix: number;
                bm: number;
                ix: number;
                mn: string;
                hd: boolean;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                o?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                it?: undefined;
                np?: undefined;
                cix?: undefined;
                bm?: undefined;
                ix?: undefined;
                mn?: undefined;
                hd?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ind: number;
                ty: string;
                ix: number;
                ks: {
                    a: number;
                    k: {
                        i: number[][];
                        o: number[][];
                        v: number[][];
                        c: boolean;
                    };
                    ix: number;
                };
                nm: string;
                mn: string;
                hd: boolean;
                c?: undefined;
                o?: undefined;
                r?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                c: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                r: number;
                bm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mn?: undefined;
                hd?: undefined;
                c?: undefined;
                bm?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        })[];
        ip: number;
        op: number;
        st: number;
        bm: number;
    } | {
        ddd: number;
        ind: number;
        ty: number;
        nm: string;
        sr: number;
        ks: {
            o: {
                a: number;
                k: number;
                ix: number;
            };
            r: {
                a: number;
                k: number;
                ix: number;
            };
            p: {
                a: number;
                k: ({
                    i: {
                        x: number;
                        y: number;
                    };
                    o: {
                        x: number;
                        y: number;
                    };
                    t: number;
                    s: number[];
                    to: number[];
                    ti: number[];
                } | {
                    t: number;
                    s: number[];
                    i?: undefined;
                    o?: undefined;
                    to?: undefined;
                    ti?: undefined;
                })[];
                ix: number;
            };
            a: {
                a: number;
                k: number[];
                ix: number;
            };
            s: {
                a: number;
                k: number[];
                ix: number;
            };
        };
        ao: number;
        shapes: ({
            ty: string;
            it: ({
                ind: number;
                ty: string;
                ix: number;
                ks: {
                    a: number;
                    k: {
                        i: number[][];
                        o: number[][];
                        v: number[][];
                        c: boolean;
                    };
                    ix: number;
                };
                nm: string;
                mn: string;
                hd: boolean;
                c?: undefined;
                o?: undefined;
                r?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                c: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                r: number;
                bm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mn?: undefined;
                hd?: undefined;
                c?: undefined;
                bm?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ty: string;
                it: ({
                    ty: string;
                    it: ({
                        ind: number;
                        ty: string;
                        ix: number;
                        ks: {
                            a: number;
                            k: {
                                i: number[][];
                                o: number[][];
                                v: number[][];
                                c: boolean;
                            };
                            ix: number;
                        };
                        nm: string;
                        mn: string;
                        hd: boolean;
                        c?: undefined;
                        o?: undefined;
                        r?: undefined;
                        bm?: undefined;
                        p?: undefined;
                        a?: undefined;
                        s?: undefined;
                        sk?: undefined;
                        sa?: undefined;
                    } | {
                        ty: string;
                        c: {
                            a: number;
                            k: number[];
                            ix: number;
                        };
                        o: {
                            a: number;
                            k: number;
                            ix: number;
                        };
                        r: number;
                        bm: number;
                        nm: string;
                        mn: string;
                        hd: boolean;
                        ind?: undefined;
                        ix?: undefined;
                        ks?: undefined;
                        p?: undefined;
                        a?: undefined;
                        s?: undefined;
                        sk?: undefined;
                        sa?: undefined;
                    } | {
                        ty: string;
                        p: {
                            a: number;
                            k: number[];
                            ix: number;
                        };
                        a: {
                            a: number;
                            k: number[];
                            ix: number;
                        };
                        s: {
                            a: number;
                            k: number[];
                            ix: number;
                        };
                        r: {
                            a: number;
                            k: number;
                            ix: number;
                        };
                        o: {
                            a: number;
                            k: number;
                            ix: number;
                        };
                        sk: {
                            a: number;
                            k: number;
                            ix: number;
                        };
                        sa: {
                            a: number;
                            k: number;
                            ix: number;
                        };
                        nm: string;
                        ind?: undefined;
                        ix?: undefined;
                        ks?: undefined;
                        mn?: undefined;
                        hd?: undefined;
                        c?: undefined;
                        bm?: undefined;
                    })[];
                    nm: string;
                    np: number;
                    cix: number;
                    bm: number;
                    ix: number;
                    mn: string;
                    hd: boolean;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    r?: undefined;
                    o?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    p: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    a: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    s: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    r: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sk: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sa: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    nm: string;
                    it?: undefined;
                    np?: undefined;
                    cix?: undefined;
                    bm?: undefined;
                    ix?: undefined;
                    mn?: undefined;
                    hd?: undefined;
                })[];
                nm: string;
                np: number;
                cix: number;
                bm: number;
                ix: number;
                mn: string;
                hd: boolean;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                o?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                it?: undefined;
                np?: undefined;
                cix?: undefined;
                bm?: undefined;
                ix?: undefined;
                mn?: undefined;
                hd?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ty: string;
                it: ({
                    ind: number;
                    ty: string;
                    ix: number;
                    ks: {
                        a: number;
                        k: {
                            i: number[][];
                            o: number[][];
                            v: number[][];
                            c: boolean;
                        };
                        ix: number;
                    };
                    nm: string;
                    mn: string;
                    hd: boolean;
                    c?: undefined;
                    o?: undefined;
                    r?: undefined;
                    bm?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    c: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    r: number;
                    bm: number;
                    nm: string;
                    mn: string;
                    hd: boolean;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    p?: undefined;
                    a?: undefined;
                    s?: undefined;
                    sk?: undefined;
                    sa?: undefined;
                } | {
                    ty: string;
                    p: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    a: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    s: {
                        a: number;
                        k: number[];
                        ix: number;
                    };
                    r: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    o: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sk: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    sa: {
                        a: number;
                        k: number;
                        ix: number;
                    };
                    nm: string;
                    ind?: undefined;
                    ix?: undefined;
                    ks?: undefined;
                    mn?: undefined;
                    hd?: undefined;
                    c?: undefined;
                    bm?: undefined;
                })[];
                nm: string;
                np: number;
                cix: number;
                bm: number;
                ix: number;
                mn: string;
                hd: boolean;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                r?: undefined;
                o?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: ({
                        i: {
                            x: number;
                            y: number;
                        };
                        o: {
                            x: number;
                            y: number;
                        };
                        t: number;
                        s: number[];
                        to: number[];
                        ti: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                        to?: undefined;
                        ti?: undefined;
                    })[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: ({
                        i: {
                            x: number[];
                            y: number[];
                        };
                        o: {
                            x: number[];
                            y: number[];
                        };
                        t: number;
                        s: number[];
                    } | {
                        t: number;
                        s: number[];
                        i?: undefined;
                        o?: undefined;
                    })[];
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                it?: undefined;
                np?: undefined;
                cix?: undefined;
                bm?: undefined;
                ix?: undefined;
                mn?: undefined;
                hd?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        } | {
            ty: string;
            it: ({
                ind: number;
                ty: string;
                ix: number;
                ks: {
                    a: number;
                    k: {
                        i: number[][];
                        o: number[][];
                        v: number[][];
                        c: boolean;
                    };
                    ix: number;
                };
                nm: string;
                mn: string;
                hd: boolean;
                c?: undefined;
                o?: undefined;
                r?: undefined;
                bm?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                c: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                r: number;
                bm: number;
                nm: string;
                mn: string;
                hd: boolean;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                p?: undefined;
                a?: undefined;
                s?: undefined;
                sk?: undefined;
                sa?: undefined;
            } | {
                ty: string;
                p: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                a: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                s: {
                    a: number;
                    k: number[];
                    ix: number;
                };
                r: {
                    a: number;
                    k: number;
                    ix: number;
                };
                o: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sk: {
                    a: number;
                    k: number;
                    ix: number;
                };
                sa: {
                    a: number;
                    k: number;
                    ix: number;
                };
                nm: string;
                ind?: undefined;
                ix?: undefined;
                ks?: undefined;
                mn?: undefined;
                hd?: undefined;
                c?: undefined;
                bm?: undefined;
            })[];
            nm: string;
            np: number;
            cix: number;
            bm: number;
            ix: number;
            mn: string;
            hd: boolean;
        })[];
        ip: number;
        op: number;
        st: number;
        bm: number;
    })[];
    markers: never[];
}>;
