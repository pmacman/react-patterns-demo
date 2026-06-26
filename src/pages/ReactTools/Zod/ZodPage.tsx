import { InfoBox } from '@/components/MessageBox';
import { useRenderCounter } from '@/hooks/useRenderCounter';
import { getCountriesZod } from '@/services/mockCountryApi';
// import { getCountries } from '@/services/mockCountryApi';
import type { Country } from '@/types/CountrySchema';
import { useEffect, useState } from 'react';

function ZodPage() {
  useRenderCounter('ZodPage');

  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [selectedProvinceCode, setSelectedProvinceCode] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedCountry = countries.find((country) => country.code === selectedCountryCode) ?? null;

  const selectedProvince =
    selectedCountry?.provinces.find((province) => province.code === selectedProvinceCode) ?? null;

  const provinces = selectedCountry?.provinces ?? [];

  const shouldShowProvinceDropdown = provinces.length > 0;

  const isCountryValid = selectedCountry !== null;
  const isProvinceValid = !shouldShowProvinceDropdown || selectedProvince !== null;
  const isFormValid = isCountryValid && isProvinceValid;

  useEffect(() => {
    const abortController = new AbortController();

    const loadCountries = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        // const responseExampleWithoutZod = await getCountries(abortController.signal);
        const response = await getCountriesZod(abortController.signal);
        setCountries(response);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : 'Unknown error loading countries.',
        );
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadCountries();

    return () => {
      abortController.abort();
    };
  }, []);

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
      <h1>Zod</h1>

      <InfoBox>
        <p>
          <strong>Zod</strong> is used for runtime schema validation with TypeScript support.
        </p>
      </InfoBox>

      {isLoading && <p>Loading countries...</p>}

      {errorMessage && (
        <p className={'alert'} role='alert'>
          Error: {errorMessage}
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
                  <label htmlFor='province'>State/Province:</label>
                </div>
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
              </>
            )}

            <div>
              <button type='submit' disabled={!isFormValid}>
                Submit
              </button>
            </div>
          </form>

          {showResults && (
            <div className='form-layout form-success'>
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

export default ZodPage;
