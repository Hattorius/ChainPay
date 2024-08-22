import requests, json

# I'm not paying for every request. Just pull periodically I guess...
API_KEY = ''; # https://thegraph.com/studio/apikeys/

tokens = set()
pools = set()

skip = 0

while True:
    response = requests.post('https://gateway.thegraph.com/api/'+ API_KEY + '/subgraphs/id/Hv1GncLY5docZoGtXjo4kwbTvxm3MAhVZqBZE4sUT9eZ', json={
        "query": f"""
    {{
        pools(first: 1000, skip: {skip}, where: {{volumeUSD_gte:50000}}, orderBy: volumeUSD, orderDirection: desc) {{
            token0 {{
                id,
                symbol,
                name,
                decimals,
                txCount
            }},
            token1 {{
                id,
                symbol,
                name,
                decimals,
                txCount
            }},
            volumeUSD,
            id,
            feeTier
        }}
    }}
    """
    })
    data = response.json()["data"]["pools"]

    if len(data) == 0:
        break
    
    for pool in data:
        pools.add(json.dumps({
            "id": pool["id"],
            "token0": pool["token0"]["id"],
            "token1": pool["token1"]["id"],
            "feeTier": pool["feeTier"]
        }, sort_keys=True))

        tokens.add(json.dumps(pool["token0"], sort_keys=True))
        tokens.add(json.dumps(pool["token1"], sort_keys=True))

    skip += 1000

tokens = sorted([json.loads(token) for token in tokens], key=lambda t: int(t["txCount"]), reverse=True)
for token in tokens:
    del token["txCount"]

pools = [json.loads(pool) for pool in pools]

print("Got", len(tokens), "tokens")
print("Got", len(pools), "pools")

with open('src/lib/data/tokens.json', 'w') as f:
    f.write(json.dumps(tokens))

with open('src/lib/data/pools.json', 'w') as f:
    f.write(json.dumps(pools))
