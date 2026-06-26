import { useRenderCounter } from '@/hooks/useRenderCounter';
import { getCountriesZod } from '@/services/mockCountryApi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

function TanStackQueryPage() {
  useRenderCounter('TanStackQueryPage');

  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [selectedProvinceCode, setSelectedProvinceCode] = useState('');
  const [showResults, setShowResults] = useState(false);

  const {
    data: countries = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['countries'],
    queryFn: ({ signal }) => getCountriesZod(signal),
  });

  const selectedCountry = countries.find((country) => country.code === selectedCountryCode) ?? null;

  const selectedProvince =
    selectedCountry?.provinces.find((province) => province.code === selectedProvinceCode) ?? null;

  const provinces = selectedCountry?.provinces ?? [];

  const shouldShowProvinceDropdown = provinces.length > 0;

  const isCountryValid = selectedCountry !== null;

  const isProvinceValid = !shouldShowProvinceDropdown || selectedProvince !== null;

  const isFormValid = isCountryValid && isProvinceValid;

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountryCode(e.target.value);
    setSelectedProvinceCode('');
    setShowResults(false);
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvinceCode(e.target.value);
    setShowResults(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      setShowResults(false);
      return;
    }

    setShowResults(true);
  };

  return (
    <>
      <h1>TanStack Query Example</h1>

      {isLoading && <p>Loading countries...</p>}
      {isError && (
        <p className={'alert'} role='alert'>
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      )}

      {!isLoading && (
        <>
          <form onSubmit={handleSubmit} className={'form-layout'}>
            <div>
              <label htmlFor='country'>Country:</label>
            </div>
            <div>
              <select
                id='country'
                value={selectedCountryCode}
                onChange={handleCountryChange}
                className={'select-list'}
              >
                <option value=''>Select a country</option>

                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {shouldShowProvinceDropdown && (
              <>
                <div>
                  <label htmlFor='province'>State/Province</label>
                </div>
                <div>
                  <select
                    id='province'
                    value={selectedProvinceCode}
                    onChange={handleProvinceChange}
                    className={'select-list'}
                  >
                    <option value=''>Select a state/province</option>

                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div>
              <button type='submit' disabled={!isFormValid}>
                Submit
              </button>
            </div>
          </form>

          {showResults && (
            <div className={'form-layout form-success'}>
              <div>
                Country: {selectedCountry?.code} {selectedCountry?.name}
              </div>

              {selectedProvince && (
                <div>
                  Province: {selectedProvince?.code} {selectedProvince?.name}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default TanStackQueryPage;
