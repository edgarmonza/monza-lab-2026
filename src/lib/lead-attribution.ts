/** Attribution travels with the request, never with contact data in analytics. */
export const leadContext = () => {
  const query = new URLSearchParams(window.location.search);
  const value = (key: string) => (query.get(key) || "").slice(0, 160);
  return {
    landing: window.location.pathname,
    source: value("utm_source"), medium: value("utm_medium"),
    campaign: value("utm_campaign"), content: value("utm_content"),
    campaignId: value("campaign_id"), adId: value("ad_id"),
    qa: query.get("qa") === "1" || query.get("utm_source") === "qa",
  };
};

export const isQaVisit = () => typeof window !== "undefined" && leadContext().qa;
