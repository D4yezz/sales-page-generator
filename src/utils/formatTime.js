export function formatTimeAgo(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} years${interval > 1 ? "" : ""} ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} months ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} days ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hours ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} minutes ago`;

  if (seconds < 10) return "Just now";
  return `${Math.floor(seconds)} seconds ago`;
}

export function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  };

  return date.toLocaleString("en-US", options);
}

export function formatDateOnly(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}
