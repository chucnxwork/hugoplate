document.addEventListener("DOMContentLoaded", function () {
  var searchInput = document.getElementById("listing-search");
  var statusSelect = document.getElementById("listing-status");
  var bedroomsSelect = document.getElementById("listing-bedrooms");
  var priceSelect = document.getElementById("listing-price");
  var resetButton = document.getElementById("listing-reset");
  var cards = Array.from(document.querySelectorAll(".listing-card"));
  var emptyState = document.getElementById("listings-empty");

  function parsePriceRange(value) {
    if (!value) return null;
    var parts = value.split("-");
    return {
      min: Number(parts[0]) || 0,
      max: Number(parts[1]) || Number.POSITIVE_INFINITY,
    };
  }

  function getCardValue(card, key) {
    return (card.dataset[key] || "").toString().trim().toLowerCase();
  }

  function matchesSearch(card, query) {
    if (!query) return true;
    var fields = [
      getCardValue(card, "title"),
      getCardValue(card, "city"),
      getCardValue(card, "state"),
      getCardValue(card, "property-type"),
      getCardValue(card, "summary"),
    ];
    return fields.some(function (field) {
      return field.indexOf(query) !== -1;
    });
  }

  function matchesStatus(card, status) {
    return !status || getCardValue(card, "status") === status;
  }

  function matchesBedrooms(card, bedrooms) {
    if (!bedrooms) return true;
    var count = Number(getCardValue(card, "bedrooms")) || 0;
    return count >= Number(bedrooms);
  }

  function matchesPrice(card, range) {
    if (!range) return true;
    var price = Number(getCardValue(card, "price")) || 0;
    return price >= range.min && price <= range.max;
  }

  function filterListings() {
    var query = searchInput.value.trim().toLowerCase();
    var status = statusSelect.value;
    var bedrooms = bedroomsSelect.value;
    var priceRange = parsePriceRange(priceSelect.value);
    var visibleCount = 0;

    cards.forEach(function (card) {
      var show =
        matchesSearch(card, query) &&
        matchesStatus(card, status) &&
        matchesBedrooms(card, bedrooms) &&
        matchesPrice(card, priceRange);

      card.classList.toggle("hidden", !show);
      if (show) {
        visibleCount += 1;
      }
    });

    emptyState.classList.toggle("hidden", visibleCount > 0);
  }

  function resetFilters() {
    searchInput.value = "";
    statusSelect.value = "";
    bedroomsSelect.value = "";
    priceSelect.value = "";
    filterListings();
  }

  searchInput.addEventListener("input", filterListings);
  statusSelect.addEventListener("change", filterListings);
  bedroomsSelect.addEventListener("change", filterListings);
  priceSelect.addEventListener("change", filterListings);
  resetButton.addEventListener("click", resetFilters);

  filterListings();
});
