/// <reference path="../libs/core/enums.d.ts" />
/// <reference path="../node_modules/pxt-core/typings/globals/bluebird/index.d.ts" />
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts" />
declare function logMsg(m: string): void;
declare namespace pxsim.console {
    /**
     * Print out message
     */
    function log(msg: string): void;
}
declare namespace pxsim.control {
    /**
     * a label to jump to
     */
    function label(lbl: Label): void;
    /**
     * Compare contents of Rs and Rd
     */
    function cmp(Rd: Register, Rs: Register): void;
    /**
     * B = branch on condition
     */
    function beq(cond: Condition, lbl: Label): void;
}
declare namespace pxsim.shift {
    /**
     * Shift Rs left by 5-bit immediate value C and place result in Rd
     */
    function lsl(Rd: Register, Rs: Register, Offset5: number): void;
    /**
     * Shift Rs right by 5-bit immediate value C and place result in Rd
     */
    function lsr(Rd: Register, Rs: Register, Offset5: number): void;
}
declare namespace pxsim.logical {
    /**
     * Logically negate of the contents of Rs and place result in Rd
     */
    function neg(Rd: Register, Rs: Register): void;
    /**
     * Logical AND the contents of Rd with the contents of Rs and place result in Rd
     */
    function and(Rd: Register, Rs: Register): void;
    /**
     * Logical OR the contents of Rd with the contents of Rs and place result in Rd
     */
    function orr(Rd: Register, Rs: Register): void;
    /**
     * Logical EOR the contents of Rd with the contents of Rs and place result in Rd
     */
    function eor(Rd: Register, Rs: Register): void;
}
declare namespace pxsim.arithmetic {
    function movsImm(Rd: Register, Offset8: number): void;
    /**
     * Add 8-bit immediate value C to contents of Rd and place result in Rd
     */
    function addImm(Rd: Register, Offset8: number): void;
    /**
     * Subtract 8-bit immediate value C from contents of Rd and place result in Rd
     */
    function subImm(Rd: Register, Offset8: number): void;
    /**
     * Add contents of Rs to contents of Rd and place result in Rd
     */
    function add(Rd: Register, Rs: Register, Rn: Register): void;
    /**
     * Subtract contents of Rs from contents of Rd and place result in Rd
     */
    function sub(Rd: Register, Rs: Register, Rn: Register): void;
}
/**
 * memory
 */
declare namespace pxsim.memory {
    /**
     * Load into Rd the 32-bit value at the address specified by Rb
     */
    function ldr(Rd: Register, Rb: Register): void;
    /**
     * Store the 32-bit value in Rd at the address specified by Rb
     */
    function str(Rd: Register, Rb: Register): void;
    /**Eli */
    function set(mem: number, num: number): void;
}
/**
 * Input/output
 */
declare namespace pxsim.io {
    /**
     * Load into Rd the next 32-bit value in the input queue, if not empty.
     * If the input queue is empty, stop program execution.
     */
    function queueIn(Rd: Register): void;
    /**
     * Store into the output queue the 32-bit value in Rd.
     */
    function queueOut(Rd: Register): void;
}
declare namespace pxsim {
    function board(): Board;
    class ProcessorState {
        memory: number[];
        registers: number[];
        N: boolean;
        Z: boolean;
        C: boolean;
        constructor(memSize: number, regSize: number);
    }
    enum Phase {
        Analysis = 0,
        Execution = 1,
    }
    class Board extends pxsim.BaseBoard {
        phase: Phase;
        memory: HTMLTableElement;
        memoryCells: HTMLInputElement[];
        registers: HTMLTableElement;
        registerCells: HTMLInputElement[];
        processor: ProcessorState;
        labels: Label[];
        branchLabels: Label[];
        asyncContinuations: number[];
        constructor();
        private createTextBox();
        private initRegisters();
        private initMemory();
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void>;
        updateView(): void;
        private convertIntTo32bitHex(n, length?);
        private ensureRange(n, top);
        private overflow(n, signed?);
        subRegister(Rd: Register, Offset8: number): void;
        addRegister(Rd: Register, Offset8: number): void;
        setMemory(Me: Memory, Offset5: number): void;
        addRegisters(Rd: Register, Rs: Register, Rn: Register): void;
        subRegisters(Rd: Register, Rs: Register, Rn: Register): void;
        shiftRegister(Rd: Register, Rs: Register, op: string, Offset5: number): void;
        logicRegister(Rd: Register, op: string, Rs: Register): void;
        setRegister(Rd: Register, Offset8: number): void;
        private checkAddr(addr);
        loadRegister(Rd: Register, Rb: Register): void;
        storeRegister(Rd: Register, Rb: Register): void;
        compareRegisters(Rd: Register, Rs: Register): void;
        setLabel(lbl: Label): void;
        private branchToLabel(lbl);
        conditionalBranch(cond: Condition, lbl: Label): void;
    }
}
