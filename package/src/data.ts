const pre = '$!$!$ CHAINPAY $!$!$\n';

const datafy = (data: any) => `${pre}${JSON.stringify(data)}`;
const undatafy = (data: string) => JSON.parse(data.substring(pre.length));

export { datafy, undatafy };
