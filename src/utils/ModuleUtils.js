export const calculateRequiredEap = (module, validationResults) => {
    if (!validationResults?.modules) return 0;

    const { required_submodules, elective_submodule, thesis_submodule } = validationResults.modules;

    if (module.code === 'PM') {
        return required_submodules.reduce((sum, sub) => sum + (sub.min_credits || 0), 0);
    }

    if (module.code === 'VM' && elective_submodule) {
        return elective_submodule.min_credits || 0;
    }

    if (module.code === 'LM' && thesis_submodule) {
        return thesis_submodule.min_credits || 0;
    }

    return 0;
};