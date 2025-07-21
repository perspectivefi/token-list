export default function build(type: 'tokens' | 'wrappers') {
    // Build the token list by reading all JSON files in the tokens directory and compiling them into a single build.json file.
    const fs = require('fs');
    const path = require('path');
    const tokensDir = path.join(__dirname, type);
    const buildFilePath = path.join(tokensDir, 'build.json');

    const tokenList = [];

    fs.readdirSync(tokensDir).forEach(chainId => {
        if (!isNaN(Number(chainId))) {
            fs.readdirSync(path.join(tokensDir, chainId)).forEach(address => {
                const tokenData = JSON.parse(fs.readFileSync(path.join(tokensDir, chainId, address, "index.json"), 'utf8'));
                tokenList.push(tokenData);
                if (type === "tokens" && tokenData.logoURI) {
                    const logoExtension = tokenData.logoURI.split(".").pop()
                    fs.mkdirSync(path.join(__dirname, "../dist/images/tokens", chainId), { recursive: true });
                    fs.copyFileSync(
                        path.join(tokensDir, chainId, address, `logo.${logoExtension}`),
                        path.join(path.join(__dirname, "../dist/images/tokens"), chainId, `${address.toLowerCase()}.${logoExtension}`)
                    )
                }
            })
        }
    });

    fs.writeFileSync(buildFilePath, JSON.stringify(tokenList, null, 2));
}

console.log("* Building token list...");
build('tokens')
console.log("* Building wrapper list...");
build('wrappers')