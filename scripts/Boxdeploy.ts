import { ethers } from "hardhat";
import { upgrades } from "hardhat";

async function main(){
    const Box = await ethers.getContractFactory("Box")
    console.log('Deploying contract...')
    const box = await upgrades.deployProxy(Box,[42], {initializer: 'store'})
   
    console.log(box.address, " box(proxy) address")
    console.log(await upgrades.erc1967.getImplementationAddress(box.address)," Implementation address")
    console.log(await upgrades.erc1967.getAdminAddress(box.address)," getAdminAddress")
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

// 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9  box(proxy) address
// 0x5FbDB2315678afecb367f032d93F642f64180aa3  Implementation address
// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512  getAdmminAddress