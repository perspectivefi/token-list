import fs from "fs"

const replaceTokenLogo = async (token: { chainId: number, address: string, logoURI: string }) => {
    const needToReplaceLogo = token.logoURI.startsWith("/") && (token.logoURI as string).split("/").length-1 === 3
        if (needToReplaceLogo) {
            const newURI = `/images/tokens/${token.chainId}/${token.address.toLowerCase()}.${token.logoURI.split(".")[1]}`
            fs.copyFileSync("./src" + token.logoURI, "./src" + newURI)
            token.logoURI = newURI
        }
}

const run = async (tokenListPath: string) => {
    const tokenList = JSON.parse(fs.readFileSync(tokenListPath).toString())
    tokenList.forEach(token => {
        replaceTokenLogo(token)
        if (token.extensions?.vault?.logoURI) {
            replaceTokenLogo(token.extensions.vault)
        }
    })
    fs.writeFileSync(tokenListPath, JSON.stringify(tokenList))
}

run("./src/tokens/spectraTokens.json")
run("./src/tokens/erc4626Wrappers.json")