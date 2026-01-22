// animations.js
export const anim = (variants: any) => {
    return {
        initial: "initial",
        animate: "enter",
        exit: "exit",
        variants
    }
}

export const animScrollTrigger = (variants: any) => {
    return {
        initial: "initial",
        whileInView: "enter",
        exit: "exit",
        variants
    }
}


export const fadeIn = {
    initial: { opacity: 0, },
    enter: { opacity: 1, },
    exit: { opacity: 0,},
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.0},
    enter: { opacity: 1, scale: 1},
    exit: { opacity: 0, scale: 0.5},
};

export const slideIn = {
    initial: { opacity: 0, y: -16 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 16 },
};

export const widen = {
    initial: { width: 0 },
    enter: { width: '100%' },
    exit: { width: 0 },
};

export const tap = {
    scale: 0.9
}