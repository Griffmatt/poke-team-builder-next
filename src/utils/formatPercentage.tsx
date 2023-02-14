// eslint-disable-next-line @typescript-eslint/unbound-method
export const { format: formatPercentage } = Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
})
