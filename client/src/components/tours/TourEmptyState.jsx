import React from 'react';

const TourEmptyState = ({ onClearFilters }) => {
  return (
    <div className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-sm border border-gray-100">
      <svg
        className="mx-auto h-16 w-16 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">No tours found</h3>
      <p className="mt-1 text-sm text-gray-500">
        We couldn't find any tours matching your current filters.
      </p>
      <div className="mt-6">
        <button
          onClick={onClearFilters}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default TourEmptyState;