import { expect } from "chai";
import { Contract, BigNumber } from "ethers";
import { ethers, upgrades } from "hardhat";

// test script for upgradeable deployment

describe("Box (proxy) V2)", function(){
    let box:Contract
    let boxV2:Contract

    beforeEach(async function(){
        const Box = await ethers.getContractFactory("Box")
        const BoxV2 = await ethers.getContractFactory("BoxV2")

        box = await upgrades.deployProxy(Box, [42], {initializer:'store'})
        boxV2 = await upgrades.upgradeProxy(box.address, BoxV2)

    })

    it('should retrieve value and previously storeed and increament correctly', async function() {
        expect(await boxV2.retrieve()).to.equal(BigNumber.from('42'))
        
        await boxV2.increment()
        expect(await boxV2.retrieve()).to.equal(BigNumber.from('43'))

        await boxV2.store(90)
        expect(await boxV2.retrieve()).to.equal(BigNumber.from('90'))
    })
})