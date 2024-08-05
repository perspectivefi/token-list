
import React from "react"
import ProtocolText from "../types/ProtocolText";

// { ptAddress: ProtocolText }
const protocolCustomContent: Record<string, ProtocolText> = {
    "0x6def54ae7e38992a7d1ab60d279483ba7f7b0aeb": {
        YT: "Each YT is entitled to all the extra yield and point on top of one weETH deposit in Karak (with the multiplier).",
        pendingPoints: (
            <>
                Integration of Ether.fi Points portfolio is underway.
                <br />
                <br />
                View your Points on the{" "}
                <a
                    href="https://www.ether.fi/"
                    target="_blank"
                    className="underline"
                >
                    Ether.fi dashboard
                </a>
                .
            </>
        ),
    },
    "0xe617fc640413171100c32cc8dbf69fc7928d895e": {
        YT: "Each YT is entitled to all the yield and Points of 1 WBTC deposited in Bedrock (with the multiplier).",
        pendingPoints: (
            <>
                Points portfolio integration is underway.
                <br />
                <br />
                View your Points on the{" "}
                <a
                    href="https://app.bedrock.technology/unibtc"
                    target="_blank"
                    className="underline"
                >
                    Bedrock dashboard
                </a>
                .
            </>
        ),
    },
    "0xf58e22d224e465fb65f4257573b58dbfb0f704a0": {
        YT: "Each YT is entitled to all the extra yield and point on top of one rUSD deposit in f(x) protocol (with the multiplier).",
        pendingPoints: (
            <>
                Points portfolio integration is underway.
                <br />
                <br />
                View your Points on the{" "}
                <a
                    href="https://fx.aladdin.club/earn"
                    target="_blank"
                    className="underline"
                >
                    f(x) protocol dashboard
                </a>
                .
            </>
        ),
    },
    "0x470f623e8bc3c870f96516b8cbfc6a27e253424d": {
        YT: "Each YT is entitled to all the extra yield and point on top of one wstETH deposit in Amphor (with the multiplier).",
        pendingPoints: (
            <>
                Points portfolio integration is underway.
                <br />
                <br />
                View your Points on the{" "}
                <a
                    href="https://app.amphor.io/account"
                    target="_blank"
                    className="underline"
                >
                    Amphor dashboard
                </a>
                .
            </>
        ),
        helpText: (
            <>
                Symbiotic Points distribution on the underlying Mellow LRTs
                depends on the deposit queue status.{" "}
                <a
                    href="https://x.com/mellowprotocol/status/1800838102006591680"
                    target="_blank"
                    className="underline"
                >
                    Learn more here.
                </a>
            </>
        ),
    },
    "0xd4c0ab44698bca5070624ef62c66b1f4d1488551": {
        YT: "Each YT is entitled to all the yield and Points of 1 WETH deposited in Bedrock (with the multiplier).",
        pendingPoints: (
            <>
                Points portfolio integration is underway.
                <br />
                <br />
                View your Points on the{" "}
                <a
                    href="https://app.bedrock.technology/unieth"
                    target="_blank"
                    className="underline"
                >
                    Bedrock dashboard
                </a>
                .
            </>
        ),
    },
    "0x8f01036563831feabbf3bee396d99b117c032428": {
        YT: "Each YT is entitled to all the extra yield and point on top of one wstETH deposit in Amphor (with the multiplier).",
        pendingPoints: (
            <>
                Points portfolio integration is underway.
                <br />
                <br />
                View your Points on the{" "}
                <a
                    href="https://app.amphor.io/earn"
                    target="_blank"
                    className="underline"
                >
                    Amphor dashboard
                </a>
                .
            </>
        ),
        helpText: (
            <>
                Actual distribution of the Points may vary depending on the
                vault allocations.
            </>
        ),
    },
    "0xad3debad39c8e387f59fa025edf16f10e7aa656f": {
        YT: "Each YT is entitled to all the yield and Points of 1 WBTC deposited in Bedrock (with the multiplier).",
        pendingPoints: (
            <>
                Points portfolio integration is underway.
                <br />
                <br />
                View your Points on the{" "}
                <a
                    href="https://app.bedrock.technology/unibtc"
                    target="_blank"
                    className="underline"
                >
                    Bedrock dashboard
                </a>
                .
            </>
        ),
    },
}

export default protocolCustomContent
