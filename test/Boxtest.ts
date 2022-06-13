import { expect } from "chai";
import { Contract, BigNumber } from "ethers";
import { ethers, upgrades } from "hardhat";


describe("Box", function(){
    let box:Contract;

    beforeEach(async function(){
        const Box = await ethers.getContractFactory("Box")
        box = await upgrades.deployProxy(Box, [42], {initializer: 'store'})
        await box.deployed()
    })

    it("should retrieve value previously stored", async function(){
        const b = await box.store(42)
        expect(await box.retrieve()).to.equal(BigNumber.from("42"))
        await expect(b).to.emit(box, "ValueChanged").withArgs(42);


        const _b = await box.store(100)
        expect(await box.retrieve()).to.equal(BigNumber.from("100"))
        await expect(_b).to.emit(box, "ValueChanged").withArgs(100);
    })

})

